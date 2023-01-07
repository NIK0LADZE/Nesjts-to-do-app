import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { UserInterface } from '@interfaces';

export class AuthDTO implements UserInterface {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    /**
     * Populates AuthDTO with username and password, later to be validated
     */
    populate({ username, password }) {
        this.username = username;
        this.password = password;
    }
}