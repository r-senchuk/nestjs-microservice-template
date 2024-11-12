import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1731424351236 implements MigrationInterface {
  name = 'Migration1731424351236';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "emails" (
                "id" character varying NOT NULL,
                "email" character varying NOT NULL,
                CONSTRAINT "PK_a54dcebef8d05dca7e839749571" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_3cbf51004f0706ac67ff8c22db" ON "emails" ("email")
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "nickname" character varying NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "nickname"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_3cbf51004f0706ac67ff8c22db"
        `);
    await queryRunner.query(`
            DROP TABLE "emails"
        `);
  }
}
