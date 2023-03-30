import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(AppModule);
    const port = 3002;
    const microservice = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'USERS',
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
