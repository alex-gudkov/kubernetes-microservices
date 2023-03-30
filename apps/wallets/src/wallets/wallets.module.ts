import { Module } from '@nestjs/common';
import { ClientsModule, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletsEntity } from './entities/wallets.entity';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([WalletsEntity]),
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.TCP,
                options: {
                    port: 5001,
                },
            },
        ]),
    ],
    controllers: [WalletsController],
    providers: [
        WalletsService,
        {
            provide: 'AUTH_SERVICE',
            useValue: ClientProxyFactory.create({
                transport: Transport.TCP,
                options: {
                    port: 5001,
                },
            }),
        },
    ],
    exports: [],
})
export class WalletModule {}
