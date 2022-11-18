import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { User } from "src/users/entities/user.entity";
import { Transaction } from "./entities";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), AuthModule],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})
export class TransactionsModule {}