import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { transactionProviders } from './transaction.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TransactionsController],
  providers: [...transactionProviders, TransactionsService],
})
export class TransactionsModule {}
