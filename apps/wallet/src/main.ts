import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { WalletModule } from './wallet.module';

async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(WalletModule);
    const microservice = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            port: 5003,
        },
    });

    await app.startAllMicroservices();
    await app.listen(3003);
}

bootstrap();
