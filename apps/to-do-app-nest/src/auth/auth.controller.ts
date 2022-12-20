import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post()
    signIn(@Body() user: AuthDTO, @Res() res) {
        const { username, password } = user;
        this.authService.signIn(username, password).then(success => {
            if (success) {
                res.status(200).json({ message: 'Authorization was successful!'}).send();
                return
            }

            res.status(400).json({ message: 'Invalid username or password'}).send();
        });
        console.log(user);
    }
}