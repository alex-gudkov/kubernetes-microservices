import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWallets1680241130209 implements MigrationInterface {
    name = 'CreateWallets1680241130209';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "wallets" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "balance" integer NOT NULL DEFAULT '0',
                "userId" integer NOT NULL,
                CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "wallets";
        `);
    }
}
