import "reflect-metadata";
import "dotenv/config";

import { DataSource } from "typeorm";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT as string),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrations: [`${__dirname}/**/database/migrations/*.{ts,js}`], // Path to your migration files
  entities: [`${__dirname}/**/entities/*.{ts,js}`], // Path to your entity files
  // Remove the incorrect `migrationsDir` property
});
