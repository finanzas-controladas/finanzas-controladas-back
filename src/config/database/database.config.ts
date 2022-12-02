import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('database', () => ({
  databaseName: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT) || 5434,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  synchronize: env.DATABASE_SYNC === 'true',
  logging: env.DATABASE_LOGGING === 'true',
}));
