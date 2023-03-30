import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { RedisModule } from '@nestjs-modules/ioredis';

import { AuthHttpController } from './auth.http.controller';
import { AuthService } from './auth.service';
import { SessionsService } from './sessions.service';
import { SessionsTcpController } from './sessions.tcp.controller';

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
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'USERS',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    controllers: [AuthHttpController, SessionsTcpController],
    providers: [
        AuthService,
        SessionsService,
        {
            provide: 'USERS_SERVICE',
            useValue: ClientProxyFactory.create({
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'USERS',
                    queueOptions: {
                        durable: false,
                    },
                },
            }),
        },
    ],
    exports: [],
})
export class AuthModule {}
