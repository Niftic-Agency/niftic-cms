import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`tags\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`color\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tags_name_idx\` ON \`tags\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tags_slug_idx\` ON \`tags\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tags_updated_at_idx\` ON \`tags\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tags_created_at_idx\` ON \`tags\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_work_media_srcs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_work_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_media_srcs_order_idx\` ON \`case_studies_blocks_work_media_srcs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_media_srcs_parent_id_idx\` ON \`case_studies_blocks_work_media_srcs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_media_srcs_image_idx\` ON \`case_studies_blocks_work_media_srcs\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_work_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'image',
  	\`column_span_xs\` numeric DEFAULT 1,
  	\`column_span_lg\` numeric DEFAULT 12,
  	\`src_id\` integer,
  	\`alt\` text,
  	\`s_v_g_file_id\` integer,
  	\`background_color\` text DEFAULT '#023257',
  	\`content\` text,
  	\`cta\` text,
  	\`layout\` text DEFAULT 'default',
  	\`author\` text,
  	\`alignment\` text DEFAULT 'left',
  	\`video_i_d\` text,
  	\`center_crop\` integer DEFAULT false,
  	\`aspect_ratio\` text DEFAULT '16/9',
  	\`caption\` text,
  	\`caption_title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`src_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`s_v_g_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_media_order_idx\` ON \`case_studies_blocks_work_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_media_parent_id_idx\` ON \`case_studies_blocks_work_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_media_path_idx\` ON \`case_studies_blocks_work_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_media_src_idx\` ON \`case_studies_blocks_work_media\` (\`src_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_media_s_v_g_file_idx\` ON \`case_studies_blocks_work_media\` (\`s_v_g_file_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_work_mockup_srcs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_work_mockup\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_mockup_srcs_order_idx\` ON \`case_studies_blocks_work_mockup_srcs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_mockup_srcs_parent_id_idx\` ON \`case_studies_blocks_work_mockup_srcs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_mockup_srcs_image_idx\` ON \`case_studies_blocks_work_mockup_srcs\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_work_mockup\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'image',
  	\`column_span_xs\` numeric DEFAULT 1,
  	\`column_span_lg\` numeric DEFAULT 12,
  	\`screen_type\` text DEFAULT 'desktop',
  	\`caption_title\` text,
  	\`caption\` text,
  	\`background_color\` text DEFAULT '#023257',
  	\`background_image_id\` integer,
  	\`aspect_ratio\` text DEFAULT '16/9',
  	\`scrolling\` integer DEFAULT false,
  	\`src_id\` integer,
  	\`alt\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`src_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_mockup_order_idx\` ON \`case_studies_blocks_work_mockup\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_mockup_parent_id_idx\` ON \`case_studies_blocks_work_mockup\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_mockup_path_idx\` ON \`case_studies_blocks_work_mockup\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_mockup_background_image_idx\` ON \`case_studies_blocks_work_mockup\` (\`background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_mockup_src_idx\` ON \`case_studies_blocks_work_mockup\` (\`src_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_work_spacer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`column_span_lg\` numeric DEFAULT 12,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_spacer_order_idx\` ON \`case_studies_blocks_work_spacer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_spacer_parent_id_idx\` ON \`case_studies_blocks_work_spacer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_work_spacer_path_idx\` ON \`case_studies_blocks_work_spacer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`client\` text,
  	\`title\` text,
  	\`tile_type\` text DEFAULT 'image',
  	\`vimeo_id\` text,
  	\`tile_image_id\` integer,
  	\`slug\` text,
  	\`text_content\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`tile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_tile_image_idx\` ON \`case_studies\` (\`tile_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_slug_idx\` ON \`case_studies\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_updated_at_idx\` ON \`case_studies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_created_at_idx\` ON \`case_studies\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies__status_idx\` ON \`case_studies\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_rels_order_idx\` ON \`case_studies_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_parent_idx\` ON \`case_studies_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_path_idx\` ON \`case_studies_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_categories_id_idx\` ON \`case_studies_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_tags_id_idx\` ON \`case_studies_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_work_media_srcs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_work_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_media_srcs_order_idx\` ON \`_case_studies_v_blocks_work_media_srcs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_media_srcs_parent_id_idx\` ON \`_case_studies_v_blocks_work_media_srcs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_media_srcs_image_idx\` ON \`_case_studies_v_blocks_work_media_srcs\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_work_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'image',
  	\`column_span_xs\` numeric DEFAULT 1,
  	\`column_span_lg\` numeric DEFAULT 12,
  	\`src_id\` integer,
  	\`alt\` text,
  	\`s_v_g_file_id\` integer,
  	\`background_color\` text DEFAULT '#023257',
  	\`content\` text,
  	\`cta\` text,
  	\`layout\` text DEFAULT 'default',
  	\`author\` text,
  	\`alignment\` text DEFAULT 'left',
  	\`video_i_d\` text,
  	\`center_crop\` integer DEFAULT false,
  	\`aspect_ratio\` text DEFAULT '16/9',
  	\`caption\` text,
  	\`caption_title\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`src_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`s_v_g_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_media_order_idx\` ON \`_case_studies_v_blocks_work_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_media_parent_id_idx\` ON \`_case_studies_v_blocks_work_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_media_path_idx\` ON \`_case_studies_v_blocks_work_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_media_src_idx\` ON \`_case_studies_v_blocks_work_media\` (\`src_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_media_s_v_g_file_idx\` ON \`_case_studies_v_blocks_work_media\` (\`s_v_g_file_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_work_mockup_srcs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_work_mockup\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_mockup_srcs_order_idx\` ON \`_case_studies_v_blocks_work_mockup_srcs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_mockup_srcs_parent_id_idx\` ON \`_case_studies_v_blocks_work_mockup_srcs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_mockup_srcs_image_idx\` ON \`_case_studies_v_blocks_work_mockup_srcs\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_work_mockup\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'image',
  	\`column_span_xs\` numeric DEFAULT 1,
  	\`column_span_lg\` numeric DEFAULT 12,
  	\`screen_type\` text DEFAULT 'desktop',
  	\`caption_title\` text,
  	\`caption\` text,
  	\`background_color\` text DEFAULT '#023257',
  	\`background_image_id\` integer,
  	\`aspect_ratio\` text DEFAULT '16/9',
  	\`scrolling\` integer DEFAULT false,
  	\`src_id\` integer,
  	\`alt\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`src_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_mockup_order_idx\` ON \`_case_studies_v_blocks_work_mockup\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_mockup_parent_id_idx\` ON \`_case_studies_v_blocks_work_mockup\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_mockup_path_idx\` ON \`_case_studies_v_blocks_work_mockup\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_mockup_background_image_idx\` ON \`_case_studies_v_blocks_work_mockup\` (\`background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_mockup_src_idx\` ON \`_case_studies_v_blocks_work_mockup\` (\`src_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_work_spacer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`column_span_lg\` numeric DEFAULT 12,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_spacer_order_idx\` ON \`_case_studies_v_blocks_work_spacer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_spacer_parent_id_idx\` ON \`_case_studies_v_blocks_work_spacer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_work_spacer_path_idx\` ON \`_case_studies_v_blocks_work_spacer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_client\` text,
  	\`version_title\` text,
  	\`version_tile_type\` text DEFAULT 'image',
  	\`version_vimeo_id\` text,
  	\`version_tile_image_id\` integer,
  	\`version_slug\` text,
  	\`version_text_content\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_parent_idx\` ON \`_case_studies_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_tile_image_idx\` ON \`_case_studies_v\` (\`version_tile_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_slug_idx\` ON \`_case_studies_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_updated_at_idx\` ON \`_case_studies_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_created_at_idx\` ON \`_case_studies_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version__status_idx\` ON \`_case_studies_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_created_at_idx\` ON \`_case_studies_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_updated_at_idx\` ON \`_case_studies_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_latest_idx\` ON \`_case_studies_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_order_idx\` ON \`_case_studies_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_parent_idx\` ON \`_case_studies_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_path_idx\` ON \`_case_studies_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_categories_id_idx\` ON \`_case_studies_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_tags_id_idx\` ON \`_case_studies_v_rels\` (\`tags_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tags_id\` integer REFERENCES tags(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`case_studies_id\` integer REFERENCES case_studies(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_case_studies_id_idx\` ON \`payload_locked_documents_rels\` (\`case_studies_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`tags\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_work_media_srcs\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_work_media\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_work_mockup_srcs\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_work_mockup\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_work_spacer\`;`)
  await db.run(sql`DROP TABLE \`case_studies\`;`)
  await db.run(sql`DROP TABLE \`case_studies_rels\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_work_media_srcs\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_work_media\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_work_mockup_srcs\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_work_mockup\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_work_spacer\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`categories_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "categories_id", "posts_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "categories_id", "posts_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
}
