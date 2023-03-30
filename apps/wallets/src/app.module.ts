import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

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
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
