import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, ClientProxyFactory, RmqOptions } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletsEntity } from './entities/wallets.entity';
import { WalletsHttpController } from './wallets.http.controller';
import { WalletsService } from './wallets.service';

@Module({
    imports: [TypeOrmModule.forFeature([WalletsEntity])],
    controllers: [WalletsHttpController],
    providers: [
        WalletsService,
        {
            provide: 'AUTH_SERVICE',
            useFactory: (configService: ConfigService) => {
                const clientRmqOptions: RmqOptions = {
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.getOrThrow<string>('RABBITMQ_AUTH_URL')],
                        queue: configService.getOrThrow<string>('RABBITMQ_AUTH_QUEUE'),
                        queueOptions: {
                            durable: false,
                        },
                    },
                };

                return ClientProxyFactory.create(clientRmqOptions);
            },
            inject: [ConfigService],
        },
    ],
    exports: [],
})
export class WalletModule {}
