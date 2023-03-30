import { AuthMiddleware, AuthUtilsModule } from '@libs/auth-utils';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { WalletsHttpController } from './wallets/wallets.http.controller';
import { WalletModule } from './wallets/wallets.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                return {
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: 'root',
                    database: 'kubernetes_microservices',
                    autoLoadEntities: true,
                    synchronize: true,
                } as TypeOrmModuleOptions;
            },
        }),
        WalletModule,
        AuthUtilsModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AuthMiddleware).forRoutes(WalletsHttpController);
    }
}
