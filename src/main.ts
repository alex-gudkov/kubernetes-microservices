import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(AppModule);
    const microservice = app.connectMicroservice<MicroserviceOptions>(
        {
            transport: Transport.TCP,
            options: {
                port: 3000,
            },
        },
        {
            inheritAppConfig: true,
        },
    );

    await app.startAllMicroservices();
    await app.listen(3000);
}

bootstrap();
