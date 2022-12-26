import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post } from '@nestjs/common';
import { ToDoDTO } from './to-do.dto';
import { ToDoListService } from './to-do-list.service';
import { ToDo } from './to-do.model';

@Controller('to-do-list')
export class ToDoListController {
    constructor(private readonly toDoService: ToDoListService) { }

    @Post()
    async create(@Body() toDoObject: ToDoDTO) {
        const result = await this.toDoService.addToList(toDoObject);
        return { toDo: result };
    }

    @Patch(':toDoId')
    async update(
        @Body() toDoObject: ToDoDTO,
        @Param('toDoId') toDoId: number
    ) {
        const [result] = await this.toDoService.updateToDo(toDoObject, toDoId);

        if (result === 0) {
            throw new InternalServerErrorException('Record couldn\'t be updated');
        }

        return { message: 'Record was updated successfully!' };
    }

    @Get(':userId')
    async getUserToDoList(@Param('userId') userId: number) {
        const toDoList = (await this.toDoService.getUserToDoList(userId)).map((toDo: ToDo) => {
            const { dataValues: { id, title } } = toDo;
            return { id, title };
        });

        toDoList.sort(({ id }, { id: nextId }) => id < nextId && -1)
        return { toDoList };
    }

    @Delete(':toDoId')
    async deleteToDo(@Param('toDoId') toDoId: number) {
        const result = await this.toDoService.deleteToDoFromList(toDoId);

        if (result === 0) {
            throw new InternalServerErrorException('Record couldn\'t be deleted');
        }

        return { message: 'Record was deleted successfully!' };
    }
}