import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.getOrThrow<string>('POSTGRES_HOST'),
            port: parseInt(this.configService.getOrThrow<string>('POSTGRES_PORT'), 10),
            username: this.configService.getOrThrow<string>('POSTGRES_USER'),
            password: this.configService.getOrThrow<string>('POSTGRES_PASSWORD'),
            database: this.configService.getOrThrow<string>('POSTGRES_DB'),
            synchronize: false,
            autoLoadEntities: true,
        };
    }
}
