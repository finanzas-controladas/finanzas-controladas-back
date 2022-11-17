import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./auth/decorators";
import { User } from "./users/entities/user.entity";

@Controller('')
export class AppController {
    @Get()
    @UseGuards(AuthGuard())
    getUsers(@GetUser() user: User) {
        console.log(user)
        return "Authentication works"
    }
}