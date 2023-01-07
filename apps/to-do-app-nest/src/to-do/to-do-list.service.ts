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

    addToList(toDoDto: ToDoDTO): Promise<ToDo> {
        const { userId, title } = toDoDto;

        return this.toDoListModel.create({ userId, title });
    }

    async updateToDo(id: number, title: string) {
        return this.toDoListModel.update(
            { title },
            { where: { id } }
        )
    }

    async getUserToDoList(userId: number): Promise<ToDo[]> {
        return await this.toDoListModel.findAll({
            where: {
                userId
            }
        });
    }

    async getUserToDo(userId: number, toDoId: number): Promise<ToDo> {
        return await this.toDoListModel.findOne({
            where: {
                id: toDoId,
                userId
            }
        });
    }

    async deleteToDoFromList(id: number) {
        return await this.toDoListModel.destroy({
            where: {
                id
            }
        })
    }
}