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
}