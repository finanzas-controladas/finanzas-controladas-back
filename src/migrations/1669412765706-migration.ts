import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1669412765706 implements MigrationInterface {
    name = 'migration1669412765706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullname" character varying(255) NOT NULL, "email" character varying(60) NOT NULL, "password" text NOT NULL, "balance" numeric NOT NULL DEFAULT '0', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_transactiontype_enum" AS ENUM('expense', 'income')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "note" character varying(255), "amount" numeric NOT NULL, "date" date NOT NULL, "transactionType" "public"."transactions_transactiontype_enum" NOT NULL, "userId" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_transactiontype_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
