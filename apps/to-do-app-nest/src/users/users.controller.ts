import { Body, Controller, Post, Res } from "@nestjs/common";
import { UserDTO } from "./user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Post()
    addUser(@Body() user: UserDTO, @Res() res) {
        const { username } = user;
        console.log(user);

        this.usersService.findByUsername(username).then(foundUser => {
            const errorStack = {
                statusCode: 400,
                message: ['This username already exists'],
                error: 'Bad Request'
            }

            if (foundUser) return res.status(400).json(errorStack).send();

            // ქვემოთ რაც წერია მაგით მინდოდა გამესროლა მარა პრომისში რომ არის აპი იქრაშება თვითონ
            // if (user) throw new BadRequestException(['This username already exists']);

            this.usersService.create(user);
            res.status(200).json({ message: 'Registration was successful!'}).send();
        }).catch((error) => console.log(error));
    }
}