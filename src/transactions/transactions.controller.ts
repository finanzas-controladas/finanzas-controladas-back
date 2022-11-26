import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse } from "@nestjs/swagger";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionsService } from "./transactions.service";
import { User } from '../users/entities/user.entity';
import { GetUser } from '../auth/decorators';
import { MessageHandler } from '../shared/enums/message-handler.enum';

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