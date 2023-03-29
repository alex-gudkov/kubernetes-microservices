import { Module } from '@nestjs/common';

import { UsersHttpController } from './users.http.controller';
import { UsersService } from './users.service';
import { UsersTcpController } from './users.tcp.controller';

@Module({
    imports: [],
    providers: [UsersService],
    controllers: [UsersHttpController, UsersTcpController],
    exports: [],
})
export class UsersModule {}
