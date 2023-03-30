import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletModule } from './wallets/wallets.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'kubernetes_microservices',
            autoLoadEntities: true,
            synchronize: true,
        }),
        WalletModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
