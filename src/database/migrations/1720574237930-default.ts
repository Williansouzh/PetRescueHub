import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720574237930 implements MigrationInterface {
    name = 'Default1720574237930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "resetPasswordToken" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "resetPasswordExpires" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetPasswordExpires"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetPasswordToken"`);
    }

}
