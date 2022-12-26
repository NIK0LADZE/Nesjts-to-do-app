import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { comparePasswords } from "../utils/bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService
    ) {}

    async signIn(username: string, password: string): Promise<boolean | object> {
        const user = await this.userService.findByUsername(username);
        const { password: hashedPassword } = user || {};

        if (user) {
            const { dataValues: { id, username } } = user;
            const didMatch = comparePasswords(password, hashedPassword);

            if (didMatch) {
                return { id, username };
            }

            return false;
        }

        return false;
    }
}