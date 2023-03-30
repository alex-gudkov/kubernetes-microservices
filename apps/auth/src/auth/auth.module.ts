import { AuthUtilsModule } from '@libs/auth-utils';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, RmqOptions, Transport } from '@nestjs/microservices';
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
    ],
    controllers: [AuthHttpController, SessionsTcpController],
    providers: [
        AuthService,
        SessionsService,
        {
            provide: 'USERS_SERVICE',
            useFactory: (configService: ConfigService) => {
                const clientRmqOptions: RmqOptions = {
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.getOrThrow<string>('RABBITMQ_USERS_URL')],
                        queue: configService.getOrThrow<string>('RABBITMQ_USERS_QUEUE'),
                        queueOptions: {
                            durable: false,
                        },
                    },
                };

                return ClientProxyFactory.create(clientRmqOptions);
            },
            inject: [ConfigService],
        },
        AuthUtilsModule,
    ],
    exports: [],
})
export class AuthModule {}
