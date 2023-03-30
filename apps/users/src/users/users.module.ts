import { AuthGuardModule } from '@libs/auth-guard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersEntity } from './entities/users.entity';
import { UsersHttpController } from './users.http.controller';
import { UsersService } from './users.service';
import { UsersTcpController } from './users.tcp.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity]), AuthGuardModule],
    controllers: [UsersHttpController, UsersTcpController],
    providers: [UsersService],
    exports: [],
})
export class UsersModule {}
