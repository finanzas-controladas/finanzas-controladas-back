import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repositories } from 'src/shared/constants';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionTypes } from './enums/transaction-type.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(Repositories.TRANSACTION_REPOSITORY)
    private readonly transactionRepository: Repository<Transaction>,
    @Inject(Repositories.USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    user: User,
  ): Promise<Transaction> {
    const transactionToCreate = this.transactionRepository.create({
      ...createTransactionDto,
      user,
    });
    const createdTransaction = await this.transactionRepository.save(
      transactionToCreate,
    );

    const { transactionType, amount } = createTransactionDto;
    const newUserBalance =
      transactionType === TransactionTypes.Expense
        ? Number(user.balance) - amount
        : Number(user.balance) + amount;
    const updatedUser = await this.userRepository.preload({
      ...user,
      balance: newUserBalance,
    });
    await this.userRepository.save(updatedUser);

    createdTransaction.user.balance = newUserBalance;

    return createdTransaction;
  }

  async findAll(user: User): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      where: {
        user: { id: user.id },
      },
    });
  }
}
