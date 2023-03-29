import { NestFactory } from '@nestjs/core';

import { WalletModule } from './wallet.module';

async function bootstrap() {
    const app = await NestFactory.create(WalletModule);
    const port = 3003;

    await app.listen(port);
}

bootstrap();
