import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { GetUser } from '../auth/decorators';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('balance')
    @UseGuards(AuthGuard())
    getBalance(@GetUser() user: User) {
        return this.usersService.getBalance(user);
    }
}