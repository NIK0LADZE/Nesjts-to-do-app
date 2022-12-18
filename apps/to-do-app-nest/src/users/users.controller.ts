import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { UserDTO } from "./user.dto";
import { User } from "./user.model";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Post()
    addUser(@Body() user: UserDTO) {
        console.log(user);
        if (user.password !== user.passwordConfirm) {
            throw new BadRequestException(['Passwords don\'t match'])
        }
        return this.usersService.create(user);
    }

    @Get()
    test() {
        return this.usersService.findAll();
    }
}