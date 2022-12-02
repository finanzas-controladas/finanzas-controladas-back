import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/app/app-config.module';
import { TypeOrmConfigModule } from './config/typeorm/typeorm-config.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmConfigModule,
    AuthModule,
    UsersModule,
    TransactionsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
