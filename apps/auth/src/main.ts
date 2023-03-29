import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AuthModule } from './auth.module';

async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(AuthModule);
    const port = 3001;
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
