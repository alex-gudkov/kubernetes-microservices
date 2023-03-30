import { Module } from '@nestjs/common';
import { ClientsModule, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'AUTH',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    controllers: [],
    providers: [
        {
            provide: 'AUTH_SERVICE',
            useValue: ClientProxyFactory.create({
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'AUTH',
                    queueOptions: {
                        durable: false,
                    },
                },
            }),
        },
    ],
    exports: [
        {
            provide: 'AUTH_SERVICE',
            useValue: ClientProxyFactory.create({
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'AUTH',
                    queueOptions: {
                        durable: false,
                    },
                },
            }),
        },
    ],
})
export class AuthUtilsModule {}
