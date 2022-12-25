import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { ToDoListModule } from '../to-do/to-do-list.module';
import { User } from '../users/user.model';
import { UsersModule } from '../users/users.module';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ToDoListModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'to-do-list',
      models: [User],
      autoLoadModels: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
