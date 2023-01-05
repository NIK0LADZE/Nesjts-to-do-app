import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserInterface } from '@interfaces';

export class AuthDTO implements UserInterface {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}