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
    host: config.get<string>('DATABASE_HOST'),
    port: config.get<number>('DATABASE_PORT'),
    username: config.get<string>('DATABASE_USERNAME'),
    password: config.get<string>('DATABASE_PASSWORD'),
    database: config.get<string>('DATABASE_NAME'),
    entities: [__dirname + './../../**/*.entity.{.ts,.js}'],
    synchronize: config.get<boolean>('SYNC'),
    logging: config.get<boolean>('DATABASE_LOGGING'),
    logger: config.get<string>('DATABASE_LOGGER'),
    autoLoadEntities: true,
    ssl: config.get<string>('DATABASE_SSL') === 'true',
  } as TypeOrmModuleAsyncOptions);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.production'],
    }),
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
