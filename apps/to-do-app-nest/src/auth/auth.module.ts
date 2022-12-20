import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from "../users/user.model";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}