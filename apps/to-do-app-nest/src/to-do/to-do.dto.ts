import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserToDo } from "./to-do.model";

export class ToDoDTO implements UserToDo {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    title: string;
}