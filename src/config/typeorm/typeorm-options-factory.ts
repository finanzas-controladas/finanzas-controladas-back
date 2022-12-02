import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entitiesPath, migrationsPath } from './data-source';

export const createTypeOrmOptions = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  database: config.get('database.databaseName'),
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.username'),
  password: config.get('database.password'),
  synchronize: config.get('database.synchronize'),
  logging: config.get('database.logging'),
  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsRun: true,
});
