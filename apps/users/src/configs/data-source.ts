import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.getOrThrow<string>('POSTGRES_HOST'),
    port: parseInt(configService.getOrThrow<string>('POSTGRES_PORT'), 10),
    username: configService.getOrThrow<string>('POSTGRES_USER'),
    password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
    database: configService.getOrThrow<string>('POSTGRES_DB'),
    synchronize: true,
    entities: ['./dist/**/*.entity.js'],
    migrations: ['./dist/migrations/*.js'],
    migrationsTableName: 'migrations',
};

export const dataSource = new DataSource(dataSourceOptions);
