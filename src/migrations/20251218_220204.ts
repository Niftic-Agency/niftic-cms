import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

// Helper function to format slug (matches formatSlug utility)
function formatSlugValue(value: string): string {
  return value
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Add column as nullable first
  await db.run(sql`ALTER TABLE \`users\` ADD \`slug\` text;`)

  // Step 2: Populate existing rows with slugs based on name or email
  const users = (await db.all(
    sql`SELECT id, name, email FROM \`users\` WHERE slug IS NULL;`,
  )) as Array<{
    id: number
    name: string | null
    email: string
  }>

  for (const user of users) {
    const baseValue = user.name || user.email || 'user'
    let slug = formatSlugValue(baseValue)
    let counter = 1
    const originalSlug = slug

    // Ensure uniqueness by appending a number if needed
    while (true) {
      const existing = await db.get(sql`SELECT id FROM \`users\` WHERE slug = ${slug};`)
      if (!existing) break
      slug = `${originalSlug}-${counter}`
      counter++
    }

    await db.run(sql`UPDATE \`users\` SET \`slug\` = ${slug} WHERE id = ${user.id};`)
  }

  // Step 3: Recreate table with NOT NULL constraint
  // SQLite doesn't support ALTER COLUMN, so we need to recreate the table
  await db.run(sql`PRAGMA foreign_keys=OFF;`)

  // Create new table with slug as NOT NULL (based on the schema from 20251218_180743)
  await db.run(sql`CREATE TABLE \`__new_users\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text,
    \`slug\` text NOT NULL,
    \`photo_id\` integer REFERENCES media(id),
    \`photo_avatar_id\` integer REFERENCES media(id),
    \`bio\` text,
    \`public\` integer DEFAULT false,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`email\` text NOT NULL,
    \`reset_password_token\` text,
    \`reset_password_expiration\` text,
    \`salt\` text,
    \`hash\` text,
    \`login_attempts\` numeric DEFAULT 0,
    \`lock_until\` text
  );`)

  // Copy all data
  await db.run(
    sql`INSERT INTO \`__new_users\`("id", "name", "slug", "photo_id", "photo_avatar_id", "bio", "public", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until") SELECT "id", "name", "slug", "photo_id", "photo_avatar_id", "bio", "public", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until" FROM \`users\`;`,
  )

  // Drop old table and rename new one
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`ALTER TABLE \`__new_users\` RENAME TO \`users\`;`)

  // Recreate indexes
  await db.run(sql`CREATE UNIQUE INDEX \`users_slug_idx\` ON \`users\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE INDEX \`users_photo_idx\` ON \`users\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`users_photo_avatar_idx\` ON \`users\` (\`photo_avatar_id\`);`)

  await db.run(sql`PRAGMA foreign_keys=ON;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`users_slug_idx\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_users\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text,
    \`photo_id\` integer REFERENCES media(id),
    \`photo_avatar_id\` integer REFERENCES media(id),
    \`bio\` text,
    \`public\` integer DEFAULT false,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`email\` text NOT NULL,
    \`reset_password_token\` text,
    \`reset_password_expiration\` text,
    \`salt\` text,
    \`hash\` text,
    \`login_attempts\` numeric DEFAULT 0,
    \`lock_until\` text
  );`)
  await db.run(
    sql`INSERT INTO \`__new_users\`("id", "name", "photo_id", "photo_avatar_id", "bio", "public", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until") SELECT "id", "name", "photo_id", "photo_avatar_id", "bio", "public", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until" FROM \`users\`;`,
  )
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`ALTER TABLE \`__new_users\` RENAME TO \`users\`;`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE INDEX \`users_photo_idx\` ON \`users\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`users_photo_avatar_idx\` ON \`users\` (\`photo_avatar_id\`);`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}
