import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse } from "@nestjs/swagger";
import { GetUser } from "src/auth/decorators";
import { MessageHandler } from "src/shared/enums/message-handler.enum";
import { User } from "src/users/entities/user.entity";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionsService } from "./transactions.service";

@Controller('transaction')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({ description: 'Transaction created successfully' })
    create(@Body() createTransactionDto: CreateTransactionDto, @GetUser() user: User) {
        return this.transactionsService.create(createTransactionDto, user)
    }

    @Get()
    @ApiOkResponse({ description: MessageHandler.OK_RESPONSE })
    @UseGuards(AuthGuard())
    findAll(@GetUser() user: User) {
        return this.transactionsService.findAll(user)
    }

}