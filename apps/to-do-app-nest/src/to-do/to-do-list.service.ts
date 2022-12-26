import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ToDoDTO } from "./to-do.dto";
import { ToDo } from "./to-do.model";

@Injectable()
export class ToDoListService {
    constructor(
        @InjectModel(ToDo)
        private toDoListModel: typeof ToDo,
    ) {}

    addToList(ToDoDto: ToDoDTO): Promise<ToDo> {
        const { userId, title } = ToDoDto;

        return this.toDoListModel.create({ userId, title });
    }

    async getUserToDoList(userId: number): Promise<ToDo[]> {
        return await this.toDoListModel.findAll({
            where: {
                userId
            }
        });
    }

    async deleteToDoFromList(userId: number, id: number) {
        return await this.toDoListModel.destroy({
            where: {
                userId,
                id
            }
        })
    }
}