import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Transaction } from "./entities/transaction.entity";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        ) {}

    async create(createTransactionDto: CreateTransactionDto, user: User): Promise<Transaction> {
        const transaction = this.transactionRepository.create({
            ...createTransactionDto,
            user
        })
        return await this.transactionRepository.save(transaction)
    }

    async findAll(user: User): Promise<Transaction[]> {
        return await this.transactionRepository.find({
            where: {
                user: { id: user.id}
            }
        })
    }
}
