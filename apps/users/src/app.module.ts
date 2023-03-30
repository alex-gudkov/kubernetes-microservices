import { AuthMiddleware, AuthUtilsModule } from '@libs/auth-utils';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from './configs/typeorm.config.service';
import { UsersHttpController } from './users/users.http.controller';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: './.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        UsersModule,
        AuthUtilsModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {
    public configure(middlewareConsumer: MiddlewareConsumer): void {
        middlewareConsumer.apply(AuthMiddleware).forRoutes(UsersHttpController);
    }
}
