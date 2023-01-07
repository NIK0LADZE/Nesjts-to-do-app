import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { ToDoDTO } from './to-do.dto';
import { ToDoListService } from './to-do-list.service';
import { ToDo } from './to-do.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('to-do-list')
export class ToDoListController {
    constructor(private readonly toDoService: ToDoListService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
            @Body() { title }: ToDoDTO,
            @Request() { user: { userId } }
        ) {
        const result = await this.toDoService.addToList({ userId, title });
        return { toDo: result };
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Body() { title }: ToDoDTO,
        @Request() { user: { userId } },
        @Param('id') id: number
    ) {
        const belongsToUser = await this.toDoService.getUserToDo(userId, id);
        if (!belongsToUser) throw new ForbiddenException('You don\'t have access to this record');

        const [result] = await this.toDoService.updateToDo(id, title);

        if (result === 0) {
            throw new NotFoundException('Record couldn\'t be updated');
        }

        return { message: 'Record was updated successfully!' };
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserToDoList(@Request() { user: { userId, username } }) {
        const toDoList = (await this.toDoService.getUserToDoList(userId)).map((toDo: ToDo) => {
            const { dataValues: { id, title } } = toDo;
            return { id, title };
        });

        toDoList.sort(({ id }, { id: nextId }) => id < nextId && -1)
        return { toDoList, username };
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteToDo(
        @Param('id') id: number,
        @Request() { user: { userId } }
    ) {
        const belongsToUser = await this.toDoService.getUserToDo(userId, id);
        if (!belongsToUser) throw new ForbiddenException('You don\'t have access to this record');

        const result = await this.toDoService.deleteToDoFromList(id);

        if (result === 0) {
            throw new NotFoundException('Record couldn\'t be deleted');
        }

        return { message: 'Record was deleted successfully!' };
    }
}
