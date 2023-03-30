import { AuthUtilsModule } from '@libs/auth-utils';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, RmqOptions, Transport } from '@nestjs/microservices';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';

import { AuthHttpController } from './auth.http.controller';
import { AuthService } from './auth.service';
import { SessionsService } from './sessions.service';
import { SessionsTcpController } from './sessions.tcp.controller';

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return {
                    config: {
                        url: configService.getOrThrow<string>('REDIS_URL'),
                    },
                } as RedisModuleOptions;
            },
            inject: [ConfigService],
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
