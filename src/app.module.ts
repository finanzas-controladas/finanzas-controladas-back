import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

export const getTypeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT ?? 5436),
  username: process.env.DATABASE_USER ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? 'fHD*h9yMJU4',
  database: process.env.DATABASE_NAME ?? 'FinanzasControladas',
  entities: [__dirname + '/../../**/*.entity.{.ts,.js}'],
  synchronize: process.env.SYNC === 'true',
  logging: process.env.DATABASE_LOGGING === 'true',
  autoLoadEntities: true,
  ssl: process.env.DATABASE_SSL === 'true',
  retryAttempts: 5,
};
console.log({ getTypeOrmModuleOptions });
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: ['.env', '.env.production'],
    // }),
    TypeOrmModule.forRoot(getTypeOrmModuleOptions),
    AuthModule,
    TransactionsModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
