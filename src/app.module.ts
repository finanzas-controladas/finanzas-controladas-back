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

export const getTypeOrmModuleOptions = () =>
  ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + './../../**/*.entity.{.ts,.js}'],
    synchronize: process.env.SYNC === 'true',
    logging: process.env.DATABASE_LOGGING === 'true',
    logger: process.env.DATABASE_LOGGER,
    autoLoadEntities: false,
    ssl: process.env.DATABASE_SSL === 'true',
    retryAttempts: 5,
    retryDelay: 5000,
    toRetry: () => false,
    keepConnectionAlive: true,
    verboseRetryLog: true,
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: ['.env', '.env.production'],
    // }),
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule],
      // inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
    AuthModule,
    TransactionsModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
