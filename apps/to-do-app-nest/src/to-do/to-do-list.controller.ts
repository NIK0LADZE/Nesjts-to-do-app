import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ToDoDTO } from './to-do.dto';
import { ToDoListService } from './to-do-list.service';
import { ToDo } from './to-do.model';

@Controller('to-do-list')
export class ToDoListController {
    constructor(private readonly toDoService: ToDoListService) {}

    @Post()
    create(@Body() toDoObject: ToDoDTO) {
        console.log(toDoObject);
        this.toDoService.addToList(toDoObject);
        return { message: 'Record was created successfully!' };
    }

    @Get(':userId')
    async getUserToDoList(@Param('userId') userId: number) {
        const toDoList = (await this.toDoService.getUserToDoList(userId)).map((toDo: ToDo) => {
            const { dataValues: { title } } = toDo;
            return { title };
        });
        console.log(toDoList);
        return { toDoList };
    }
}
