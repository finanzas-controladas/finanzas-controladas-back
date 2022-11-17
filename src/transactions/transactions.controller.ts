import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse, ApiForbiddenResponse } from "@nestjs/swagger";
import { GetUser } from "src/auth/decorators";
import { User } from "src/users/entities/user.entity";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionsService } from "./transactions.service";

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({ description: 'Transaction created successfully' })
    @ApiForbiddenResponse({ description: 'Forbidden'})
    create(@Body() createTransactionDto: CreateTransactionDto, @GetUser() user: User) {
        return this.transactionsService.create(createTransactionDto, user)
    }
}