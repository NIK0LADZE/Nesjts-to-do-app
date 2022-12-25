import { Body, Controller, Get, Post } from '@nestjs/common';
import { ToDoDTO } from './to-do.dto';
import { ToDoListService } from './to-do-list.service';

@Controller('to-do-list')
export class ToDoListController {
    constructor(private readonly toDoService: ToDoListService) {}

    @Post()
    create(@Body() toDoObject: ToDoDTO) {
        console.log(toDoObject);
        this.toDoService.addToList(toDoObject);
        return { message: 'Record was created successfully!' };
    }
}
