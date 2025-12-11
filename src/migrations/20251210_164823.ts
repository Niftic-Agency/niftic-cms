import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`color\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_name_idx\` ON \`categories\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_rich_text_order_idx\` ON \`posts_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_rich_text_parent_id_idx\` ON \`posts_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_rich_text_path_idx\` ON \`posts_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`alt\` text,
  	\`width\` text DEFAULT 'full',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_order_idx\` ON \`posts_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_parent_id_idx\` ON \`posts_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_path_idx\` ON \`posts_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_image_idx\` ON \`posts_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`video_url\` text,
  	\`title\` text,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_order_idx\` ON \`posts_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_parent_id_idx\` ON \`posts_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_path_idx\` ON \`posts_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_blockquote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`attribution\` text,
  	\`style\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_blockquote_order_idx\` ON \`posts_blocks_blockquote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_blockquote_parent_id_idx\` ON \`posts_blocks_blockquote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_blockquote_path_idx\` ON \`posts_blocks_blockquote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_code\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`language\` text DEFAULT 'javascript',
  	\`caption\` text,
  	\`show_line_numbers\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_code_order_idx\` ON \`posts_blocks_code\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_code_parent_id_idx\` ON \`posts_blocks_code\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_code_path_idx\` ON \`posts_blocks_code\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_interview_qa_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`questioner\` text,
  	\`answer\` text,
  	\`answerer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_interview\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_interview_qa_items_order_idx\` ON \`posts_blocks_interview_qa_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_interview_qa_items_parent_id_idx\` ON \`posts_blocks_interview_qa_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_interview\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`introduction\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_interview_order_idx\` ON \`posts_blocks_interview\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_interview_parent_id_idx\` ON \`posts_blocks_interview\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_interview_path_idx\` ON \`posts_blocks_interview\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_micro_case_study_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_micro_case_study\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_micro_case_study_tags_order_idx\` ON \`posts_blocks_micro_case_study_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_micro_case_study_tags_parent_id_idx\` ON \`posts_blocks_micro_case_study_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_micro_case_study\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`project_name\` text,
  	\`client\` text,
  	\`description\` text,
  	\`link\` text,
  	\`thumbnail_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_micro_case_study_order_idx\` ON \`posts_blocks_micro_case_study\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_micro_case_study_parent_id_idx\` ON \`posts_blocks_micro_case_study\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_micro_case_study_path_idx\` ON \`posts_blocks_micro_case_study\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_micro_case_study_thumbnail_idx\` ON \`posts_blocks_micro_case_study\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_nice_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_nice_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_nice_list_items_order_idx\` ON \`posts_blocks_nice_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_nice_list_items_parent_id_idx\` ON \`posts_blocks_nice_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_nice_list_items_icon_idx\` ON \`posts_blocks_nice_list_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_nice_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`list_title\` text,
  	\`list_style\` text DEFAULT 'numbered',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_nice_list_order_idx\` ON \`posts_blocks_nice_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_nice_list_parent_id_idx\` ON \`posts_blocks_nice_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_nice_list_path_idx\` ON \`posts_blocks_nice_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`studio_tag\` text DEFAULT 'product-studio',
  	\`category_id\` integer,
  	\`preview_description\` text,
  	\`featured\` integer DEFAULT false,
  	\`published_status\` text DEFAULT 'draft',
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_category_idx\` ON \`posts\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_featured_idx\` ON \`posts\` (\`featured\`);`)
  await db.run(sql`CREATE INDEX \`posts_published_status_idx\` ON \`posts\` (\`published_status\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
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
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_users_id_idx\` ON \`posts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_rich_text_order_idx\` ON \`_posts_v_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_rich_text_parent_id_idx\` ON \`_posts_v_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_rich_text_path_idx\` ON \`_posts_v_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`alt\` text,
  	\`width\` text DEFAULT 'full',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_order_idx\` ON \`_posts_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_parent_id_idx\` ON \`_posts_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_path_idx\` ON \`_posts_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_image_idx\` ON \`_posts_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`video_url\` text,
  	\`title\` text,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_order_idx\` ON \`_posts_v_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_parent_id_idx\` ON \`_posts_v_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_path_idx\` ON \`_posts_v_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_blockquote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`attribution\` text,
  	\`style\` text DEFAULT 'default',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_blockquote_order_idx\` ON \`_posts_v_blocks_blockquote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_blockquote_parent_id_idx\` ON \`_posts_v_blocks_blockquote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_blockquote_path_idx\` ON \`_posts_v_blocks_blockquote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_code\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`language\` text DEFAULT 'javascript',
  	\`caption\` text,
  	\`show_line_numbers\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_code_order_idx\` ON \`_posts_v_blocks_code\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_code_parent_id_idx\` ON \`_posts_v_blocks_code\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_code_path_idx\` ON \`_posts_v_blocks_code\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_interview_qa_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`questioner\` text,
  	\`answer\` text,
  	\`answerer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_interview\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_interview_qa_items_order_idx\` ON \`_posts_v_blocks_interview_qa_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_interview_qa_items_parent_id_idx\` ON \`_posts_v_blocks_interview_qa_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_interview\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`introduction\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_interview_order_idx\` ON \`_posts_v_blocks_interview\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_interview_parent_id_idx\` ON \`_posts_v_blocks_interview\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_interview_path_idx\` ON \`_posts_v_blocks_interview\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_micro_case_study_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_micro_case_study\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_micro_case_study_tags_order_idx\` ON \`_posts_v_blocks_micro_case_study_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_micro_case_study_tags_parent_id_idx\` ON \`_posts_v_blocks_micro_case_study_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_micro_case_study\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`project_name\` text,
  	\`client\` text,
  	\`description\` text,
  	\`link\` text,
  	\`thumbnail_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_micro_case_study_order_idx\` ON \`_posts_v_blocks_micro_case_study\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_micro_case_study_parent_id_idx\` ON \`_posts_v_blocks_micro_case_study\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_micro_case_study_path_idx\` ON \`_posts_v_blocks_micro_case_study\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_micro_case_study_thumbnail_idx\` ON \`_posts_v_blocks_micro_case_study\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_nice_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_nice_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_nice_list_items_order_idx\` ON \`_posts_v_blocks_nice_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_nice_list_items_parent_id_idx\` ON \`_posts_v_blocks_nice_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_nice_list_items_icon_idx\` ON \`_posts_v_blocks_nice_list_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_nice_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`list_title\` text,
  	\`list_style\` text DEFAULT 'numbered',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_nice_list_order_idx\` ON \`_posts_v_blocks_nice_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_nice_list_parent_id_idx\` ON \`_posts_v_blocks_nice_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_nice_list_path_idx\` ON \`_posts_v_blocks_nice_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_studio_tag\` text DEFAULT 'product-studio',
  	\`version_category_id\` integer,
  	\`version_preview_description\` text,
  	\`version_featured\` integer DEFAULT false,
  	\`version_published_status\` text DEFAULT 'draft',
  	\`version_published_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_category_idx\` ON \`_posts_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_featured_idx\` ON \`_posts_v\` (\`version_featured\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_published_status_idx\` ON \`_posts_v\` (\`version_published_status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_users_id_idx\` ON \`_posts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`categories_id\` integer REFERENCES categories(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`posts_id\` integer REFERENCES posts(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_blockquote\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_code\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_interview_qa_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_interview\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_micro_case_study_tags\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_micro_case_study\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_nice_list_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_nice_list\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_blockquote\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_code\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_interview_qa_items\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_interview\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_micro_case_study_tags\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_micro_case_study\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_nice_list_items\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_nice_list\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
