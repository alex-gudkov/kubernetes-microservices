import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersEntity } from './entities/users.entity';
import { UsersHttpController } from './users.http.controller';
import { UsersService } from './users.service';
import { UsersTcpController } from './users.tcp.controller';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'kubernetes_microservices',
            entities: [UsersEntity],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([UsersEntity]),
    ],
    controllers: [UsersHttpController, UsersTcpController],
    providers: [UsersService],
    exports: [],
})
export class UsersModule {}
