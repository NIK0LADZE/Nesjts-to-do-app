import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from "../users/user.model";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthDataValidator } from "./auth.middleware";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        PassportModule,
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_KEY,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthDataValidator).forRoutes('auth');
    }
}
