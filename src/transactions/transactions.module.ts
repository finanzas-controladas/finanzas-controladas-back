import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Transaction, TransactionType } from "./entities";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, TransactionType]), AuthModule]
})
export class TransactionsModule {}