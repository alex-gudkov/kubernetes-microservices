import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { WalletModule } from './wallet.module';

async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(WalletModule);
    const port = 3003;
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
