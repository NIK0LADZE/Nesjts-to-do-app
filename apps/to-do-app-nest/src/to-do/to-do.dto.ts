import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ToDoDTO {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    title: string;
}