import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfigService } from 'src/configs/auth.config.service';

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
            useClass: AuthConfigService,
        },
    ],
    exports: [],
})
export class WalletModule {}
