import { config } from "dotenv";
import { MigrationInterface, QueryRunner } from "typeorm";
import Users from "../../app/models/UsersModels";
import Database from "../connection";
import bcrypt from "bcrypt";

config();

const {
  OWN_EMAIL,
  OWN_PASS ,
  OWN_LNAME,
  OWN_FNAME
} = process.env;


export class InsertOwnerApplication1655506036500 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
      if (!OWN_PASS) throw "No password identify";
      const hash = bcrypt.hashSync(OWN_PASS, 2);
      await Database.createQueryBuilder().insert().into(Users).values({
        firstName: OWN_EMAIL,
        lastName: OWN_FNAME,
        email: OWN_LNAME,
        passwordHash: hash,
        userLevel: "onwer"
      }).execute();
    }

    async down(queryRunner: QueryRunner): Promise<void> {

    }
}