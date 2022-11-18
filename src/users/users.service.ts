import { Injectable } from "@nestjs/common";
import { ReadUserBalanceDto } from "./dto/read-user-balance.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    async getBalance(user: User): Promise<ReadUserBalanceDto> {
        return { balance: user.balance };
    }
}