import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post()
    async signIn(@Body() user: AuthDTO) {
        const { username, password } = user;
        const wasSignInSuccess = await this.authService.signIn(username, password);

        if (!wasSignInSuccess) throw new BadRequestException(['Invalid username or password']);
        return { message: 'Authorization was successful!'};
    }
}