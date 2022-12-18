import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { UsersModule } from '../users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
