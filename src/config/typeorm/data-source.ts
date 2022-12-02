import { join } from 'path';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const entitiesPath = join(
  __dirname,
  '../../**/entities/*.entity.{js,ts}',
);
export const migrationsPath = join(
  __dirname,
  '../../database/migrations/*.{js,ts}',
);

const { env } = process;

const dataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: parseInt(env.DATABASE_PORT),
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [entitiesPath],
  migrations: [migrationsPath],
});
dataSource.initialize();

export default dataSource;
