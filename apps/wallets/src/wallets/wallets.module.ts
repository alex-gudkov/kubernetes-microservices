import { Module } from '@nestjs/common';
import { ClientsModule, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletsEntity } from './entities/wallets.entity';
import { WalletsHttpController } from './wallets.http.controller';
import { WalletsService } from './wallets.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([WalletsEntity]),
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
    controllers: [WalletsHttpController],
    providers: [
        WalletsService,
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
    exports: [],
})
export class WalletModule {}
