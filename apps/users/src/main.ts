import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { UsersModule } from './users.module';

async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(UsersModule);
    const port = 3002;
    const microservice = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            port,
        },
    });

    await app.startAllMicroservices();
    await app.listen(port);
}

bootstrap();
