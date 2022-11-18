import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsEnum, IsDate } from "class-validator";
import { Type } from 'class-transformer'
import { TransactionType } from "../enums/transaction-type.enum";

export class CreateTransactionDto {
    @ApiProperty()
    @Optional()
    note?: string
    
    @ApiProperty({ example: 30000 })
    @IsNumber()
    amount: number

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    date: Date

    @ApiProperty()
    @IsEnum(TransactionType)
    transactionType: TransactionType
}