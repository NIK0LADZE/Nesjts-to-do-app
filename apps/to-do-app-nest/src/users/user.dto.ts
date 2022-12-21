import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Match } from "./match.decorator";

export class UserDTO {
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

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Match('password', { message: 'Passwords don\'t match'})
    passwordConfirm: string;
}