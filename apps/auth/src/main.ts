import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(AppModule);
    const microservice = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            port: 5001,
        },
    });

    app.use(cookieParser());

    await app.startAllMicroservices();
    await app.listen(3001);
}

bootstrap();
