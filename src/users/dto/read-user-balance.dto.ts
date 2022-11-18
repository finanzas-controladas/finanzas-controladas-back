import { ApiProperty } from "@nestjs/swagger";

export class ReadUserBalanceDto {
    @ApiProperty()
    balance: number;
}