import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Match } from "./match.decorator";

export class UserDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    // @Match('password')
    passwordConfirm: string;
}