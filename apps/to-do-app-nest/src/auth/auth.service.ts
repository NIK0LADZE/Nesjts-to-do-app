import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { comparePasswords } from "../utils/bcrypt";

export interface FoundUser {
    userId: number;
    username: string;
}

export interface JwtPayload {
    username: string,
    sub: string | number;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<object | null> {
        const user = await this.userService.findByUsername(username);

        if (user) {
            const { id: userId, username } = user;
            const { password: hashedPassword } = user;
            const didMatch = comparePasswords(password, hashedPassword);

            if (didMatch) {
                return { userId, username };
            }

            return null;
        }

        return null;
    }

    signIn(user: FoundUser) {
        const { userId, username } = user;
        const payload: JwtPayload = { username, sub: userId };

        return {
            userId,
            username,
            access_token: this.jwtService.sign(payload),
            message: 'Authorization was successful!'
        }
    }
}
