import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, ClientProxy, Closeable, RmqOptions, Transport } from '@nestjs/microservices';
import { ClientProxyFactory, IClientProxyFactory } from '@nestjs/microservices/client/client-proxy-factory';

@Injectable()
export class UsersConfigService implements IClientProxyFactory {
    constructor(private configService: ConfigService) {}

    public create(clientOptions: ClientOptions): ClientProxy & Closeable {
        const clientRmqOptions: RmqOptions = {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.getOrThrow<string>('RABBITMQ_USERS_URL')],
                queue: this.configService.getOrThrow<string>('RABBITMQ_USERS_QUEUE'),
                queueOptions: {
                    durable: false,
                },
            },
        };

        return ClientProxyFactory.create(clientRmqOptions);
    }
}
