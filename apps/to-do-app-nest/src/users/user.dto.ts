import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Match } from "./decorators/Match.decorator";
import { IsUsernameUnique } from "./decorators/IsUsernameUnique.decorator";
import { UserInterface } from "@interfaces";

export class UserDTO implements UserInterface {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @IsUsernameUnique({ message: 'User $value already exists. Choose another name.'})
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