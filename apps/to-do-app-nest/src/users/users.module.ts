import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { IsUsernameUniqueConstraint } from "./decorators/IsUsernameUnique.decorator";
import { User } from "./user.model";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, IsUsernameUniqueConstraint],
    exports: [UsersService]
})
export class UsersModule {}