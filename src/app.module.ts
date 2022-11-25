import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

export const getTypeOrmModuleOptions = async (config: ConfigService) =>
  ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + './../../**/*.entity.{.ts,.js}'],
    synchronize: process.env.SYNC,
    logging: process.env.DATABASE_LOGGING,
    logger: process.env.DATABASE_LOGGER,
    autoLoadEntities: true,
    ssl: process.env.DATABASE_SSL,
  } as TypeOrmModuleAsyncOptions);

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: ['.env', '.env.production'],
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
    AuthModule,
    TransactionsModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
