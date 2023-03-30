import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModuleOptions, RedisModuleOptionsFactory } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisConfigService implements RedisModuleOptionsFactory {
    constructor(private configService: ConfigService) {}

    public createRedisModuleOptions(): RedisModuleOptions {
        return {
            config: {
                url: this.configService.getOrThrow<string>('REDIS_URL'),
            },
        };
    }
}
