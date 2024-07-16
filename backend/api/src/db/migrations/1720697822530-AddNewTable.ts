import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewTable1720697822530 implements MigrationInterface {
    name = 'AddNewTable1720697822530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "token" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "token" SET NOT NULL`);
    }

}
