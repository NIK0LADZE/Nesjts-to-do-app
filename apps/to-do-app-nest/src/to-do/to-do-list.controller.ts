import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post } from '@nestjs/common';
import { ToDoDTO } from './to-do.dto';
import { ToDoListService } from './to-do-list.service';
import { ToDo } from './to-do.model';

@Controller('to-do-list')
export class ToDoListController {
    constructor(private readonly toDoService: ToDoListService) {}

    @Post()
    async create(@Body() toDoObject: ToDoDTO) {
        console.log(toDoObject);
        const result = await this.toDoService.addToList(toDoObject);
        console.log(result);
        return { toDo: result };
    }

    @Get(':userId')
    async getUserToDoList(@Param('userId') userId: number) {
        const toDoList = (await this.toDoService.getUserToDoList(userId)).map((toDo: ToDo) => {
            const { dataValues: { id, title } } = toDo;
            return { id, title };
        });
        console.log(toDoList);
        return { toDoList };
    }

    @Delete(':userId/:toDoId')
    async deleteToDo(
        @Param('userId') userId: number,
        @Param('toDoId') toDoId: number
    ) {
        const result = await this.toDoService.deleteToDoFromList(userId, toDoId);

        if (result === 0) {
            throw new InternalServerErrorException('Record couldn\'t be deleted');
        }

        return { message: 'Record was deleted successfully!' };
    }
}
