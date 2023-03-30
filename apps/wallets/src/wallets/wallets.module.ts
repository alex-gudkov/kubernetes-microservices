import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usersServiceProvider } from 'src/configs/users-service.provider';

import { WalletsEntity } from './entities/wallets.entity';
import { WalletsHttpController } from './wallets.http.controller';
import { WalletsService } from './wallets.service';

@Module({
    imports: [TypeOrmModule.forFeature([WalletsEntity])],
    controllers: [WalletsHttpController],
    providers: [WalletsService, usersServiceProvider],
    exports: [],
})
export class WalletModule {}
