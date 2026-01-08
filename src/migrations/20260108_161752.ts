import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)

  // Clean up any leftover temporary tables from previous failed migration attempts
  await db.run(sql`DROP TABLE IF EXISTS \`__temp_posts_rels\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`__new_posts\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`__new__posts_v\`;`)

  // Check if posts_rels exists
  const postsRelsExists = await db.get(sql`
    SELECT name FROM sqlite_master WHERE type='table' AND name='posts_rels';
  `)

  // Create temporary posts_rels WITHOUT foreign key to posts
  await db.run(sql`CREATE TABLE \`__temp_posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)

  // Copy data from posts_rels if it exists
  if (postsRelsExists) {
    await db.run(
      sql`INSERT INTO \`__temp_posts_rels\`("id", "order", "parent_id", "path", "users_id") SELECT "id", "order", "parent_id", "path", "users_id" FROM \`posts_rels\`;`,
    )
    await db.run(sql`DROP TABLE \`posts_rels\`;`)
  }

  // Now handle the posts table
  const postsExists = await db.get(sql`
    SELECT name FROM sqlite_master WHERE type='table' AND name='posts';
  `)

  await db.run(sql`CREATE TABLE \`__new_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`studio_tag\` text DEFAULT 'product-studio',
  	\`preview_description\` text,
  	\`featured\` integer DEFAULT false,
  	\`featured_image_id\` integer,
  	\`published_status\` text DEFAULT 'draft',
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)

  if (postsExists) {
    await db.run(
      sql`INSERT INTO \`__new_posts\`("id", "title", "slug", "studio_tag", "preview_description", "featured", "featured_image_id", "published_status", "published_at", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "studio_tag", "preview_description", "featured", "featured_image_id", "published_status", "published_at", "updated_at", "created_at", "_status" FROM \`posts\`;`,
    )
    await db.run(sql`DROP TABLE \`posts\`;`)
  }

  await db.run(sql`ALTER TABLE \`__new_posts\` RENAME TO \`posts\`;`)

  // NOW recreate posts_rels with the foreign key to posts
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)

  // Copy data back from temp table
  const tempPostsRelsExists = await db.get(sql`
    SELECT name FROM sqlite_master WHERE type='table' AND name='__temp_posts_rels';
  `)

  if (tempPostsRelsExists) {
    await db.run(
      sql`INSERT INTO \`posts_rels\`("id", "order", "parent_id", "path", "users_id") SELECT "id", "order", "parent_id", "path", "users_id" FROM \`__temp_posts_rels\`;`,
    )
    await db.run(sql`DROP TABLE \`__temp_posts_rels\`;`)
  }

  // Create indexes for posts_rels
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_users_id_idx\` ON \`posts_rels\` (\`users_id\`);`)

  // Re-enable foreign keys before creating indexes on posts
  await db.run(sql`PRAGMA foreign_keys=ON;`)

  // Create indexes for posts
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_featured_idx\` ON \`posts\` (\`featured\`);`)
  await db.run(sql`CREATE INDEX \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`)
  await db.run(
    sql`CREATE INDEX \`posts_published_status_idx\` ON \`posts\` (\`published_status\`);`,
  )
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)

  // Handle _posts_v table
  await db.run(sql`CREATE TABLE \`__new__posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_studio_tag\` text DEFAULT 'product-studio',
  	\`version_preview_description\` text,
  	\`version_featured\` integer DEFAULT false,
  	\`version_featured_image_id\` integer,
  	\`version_published_status\` text DEFAULT 'draft',
  	\`version_published_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)

  await db.run(
    sql`INSERT INTO \`__new__posts_v\`("id", "parent_id", "version_title", "version_slug", "version_studio_tag", "version_preview_description", "version_featured", "version_featured_image_id", "version_published_status", "version_published_at", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest") SELECT "id", "parent_id", "version_title", "version_slug", "version_studio_tag", "version_preview_description", "version_featured", "version_featured_image_id", "version_published_status", "version_published_at", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest" FROM \`_posts_v\`;`,
  )
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__posts_v\` RENAME TO \`_posts_v\`;`)

  // Create indexes for _posts_v
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_featured_idx\` ON \`_posts_v\` (\`version_featured\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_featured_image_idx\` ON \`_posts_v\` (\`version_featured_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_published_status_idx\` ON \`_posts_v\` (\`version_published_status\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`,
  )
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)

  // Add new columns
  await db.run(sql`ALTER TABLE \`users\` ADD \`title\` text;`)
  await db.run(
    sql`ALTER TABLE \`posts_rels\` ADD \`categories_id\` integer REFERENCES categories(id);`,
  )
  await db.run(
    sql`CREATE INDEX \`posts_rels_categories_id_idx\` ON \`posts_rels\` (\`categories_id\`);`,
  )
  await db.run(
    sql`ALTER TABLE \`_posts_v_rels\` ADD \`categories_id\` integer REFERENCES categories(id);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_rels_categories_id_idx\` ON \`_posts_v_rels\` (\`categories_id\`);`,
  )
}
