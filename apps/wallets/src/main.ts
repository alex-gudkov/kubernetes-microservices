import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(AppModule);
    const configService = app.get<ConfigService>(ConfigService);
    const port = parseInt(configService.getOrThrow<string>('APP_PORT'), 10);
    const microservice = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_WALLETS_URL')],
            queue: configService.getOrThrow<string>('RABBITMQ_WALLETS_QUEUE'),
            queueOptions: {
                durable: false,
            },
        },
    });

    app.use(cookieParser());

    await app.startAllMicroservices();
    await app.listen(port);
}

bootstrap();
