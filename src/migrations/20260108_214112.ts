import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`users\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_work_media\` DROP COLUMN \`alt\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_work_media\` DROP COLUMN \`cta\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_work_mockup\` DROP COLUMN \`alt\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_work_media\` DROP COLUMN \`alt\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_work_media\` DROP COLUMN \`cta\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_work_mockup\` DROP COLUMN \`alt\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`case_studies_blocks_work_media\` ADD \`alt\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_work_media\` ADD \`cta\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_work_mockup\` ADD \`alt\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_work_media\` ADD \`alt\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_work_media\` ADD \`cta\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_work_mockup\` ADD \`alt\` text;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`title\`;`)
}
