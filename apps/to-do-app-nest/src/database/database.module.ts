import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './database.config';
import { ToDo } from '../to-do/to-do.model';
import { User } from '../users/user.model';

@Module({
    imports: [
        SequelizeModule.forRoot({
            ...databaseConfig[process.env.NODE_ENV],
            models: [User, ToDo],
            autoLoadModels: true
        })
    ]
})
export class DatabaseModule {}
