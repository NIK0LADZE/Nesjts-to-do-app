import { Dialect } from 'sequelize';
import { IDatabaseConfig } from './database.interface';

export const databaseConfig: IDatabaseConfig = {
    development: {
        dialect: process.env.DB_DIALECT as Dialect,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_DEVELOPMENT,
    },
    test: {
        dialect: process.env.DB_DIALECT as Dialect,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_TEST,
    },
    production: {
        dialect: process.env.DB_DIALECT as Dialect,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_PRODUCTION,
    },
};
