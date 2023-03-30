import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule, TcpClientOptions, Transport } from '@nestjs/microservices';
import { RedisModule } from '@nestjs-modules/ioredis';

import { AuthHttpController } from './auth.http.controller';
import { AuthService } from './auth.service';
import { AuthTcpController } from './auth.tcp.controller';
import { SessionsService } from './sessions.service';

@Module({
    imports: [
        RedisModule.forRoot({
            config: {
                url: 'redis://localhost:6379',
            },
        }),
        ClientsModule.register([
            {
                name: 'USERS_SERVICE',
                transport: Transport.TCP,
                options: {
                    port: 5002,
                },
            },
        ]),
    ],
    controllers: [AuthHttpController, AuthTcpController],
    providers: [
        AuthService,
        SessionsService,
        {
            provide: 'USERS_SERVICE',
            useValue: ClientProxyFactory.create({
                transport: Transport.TCP,
                options: {
                    port: 5002,
                },
            }),
        },
    ],
    exports: [],
})
export class AuthModule {}
