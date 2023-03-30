import { AuthMiddleware, AuthUtilsModule } from '@libs/auth-utils';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { UsersHttpController } from './users/users.http.controller';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: './.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.getOrThrow<string>('POSTGRES_HOST'),
                    port: parseInt(configService.getOrThrow<string>('POSTGRES_PORT'), 10),
                    username: configService.getOrThrow<string>('POSTGRES_USER'),
                    password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
                    database: configService.getOrThrow<string>('POSTGRES_DB'),
                    autoLoadEntities: true,
                    synchronize: true,
                } as TypeOrmModuleOptions;
            },
            inject: [ConfigService],
        }),
        UsersModule,
        AuthUtilsModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AuthMiddleware).forRoutes(UsersHttpController);
    }
}
