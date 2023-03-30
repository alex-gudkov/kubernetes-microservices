import { AuthMiddleware, AuthUtilsModule } from '@libs/auth-utils';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from './configs/typeorm.config.service';
import { WalletsHttpController } from './wallets/wallets.http.controller';
import { WalletModule } from './wallets/wallets.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: './.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        WalletModule,
        AuthUtilsModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {
    public configure(middlewareConsumer: MiddlewareConsumer): void {
        middlewareConsumer.apply(AuthMiddleware).forRoutes(WalletsHttpController);
    }
}
