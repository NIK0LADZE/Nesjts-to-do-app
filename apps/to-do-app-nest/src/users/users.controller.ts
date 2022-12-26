import { Body, Controller, Post } from "@nestjs/common";
import { UserDTO } from "./user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    addUser(@Body() user: UserDTO) {
        this.usersService.create(user);
        return { message: 'Registration was successful!' };
    }
}