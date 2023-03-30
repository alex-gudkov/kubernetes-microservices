import { AuthUtilsModule } from '@libs/auth-utils';
import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisConfigService } from 'src/configs/redis.config.service';
import { UsersConfigService } from 'src/configs/users.config.service';

import { AuthHttpController } from './auth.http.controller';
import { AuthService } from './auth.service';
import { SessionsService } from './sessions.service';
import { SessionsTcpController } from './sessions.tcp.controller';

@Module({
    imports: [RedisModule.forRootAsync({ useClass: RedisConfigService })],
    controllers: [AuthHttpController, SessionsTcpController],
    providers: [
        AuthService,
        SessionsService,
        {
            provide: 'USERS_SERVICE',
            useClass: UsersConfigService,
        },
        AuthUtilsModule,
    ],
    exports: [],
})
export class AuthModule {}
