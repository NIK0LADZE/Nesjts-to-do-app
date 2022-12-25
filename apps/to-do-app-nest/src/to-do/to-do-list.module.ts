import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from "../users/users.module";
import { ToDoListController } from "./to-do-list.controller";
import { ToDo } from "./to-do.model";
import { ToDoListService } from "./to-do-list.service";

@Module({
    imports: [
        SequelizeModule.forFeature([ToDo]),
        UsersModule
    ],
    controllers: [ToDoListController],
    providers: [ToDoListService]
})
export class ToDoListModule {}