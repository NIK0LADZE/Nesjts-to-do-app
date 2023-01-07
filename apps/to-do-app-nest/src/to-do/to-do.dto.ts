import { IsNotEmpty, IsString } from "class-validator";
import { ToDoInterface } from '@interfaces';

export class ToDoDTO implements ToDoInterface {
    userId?: number;

    @IsNotEmpty()
    @IsString()
    title: string;
}