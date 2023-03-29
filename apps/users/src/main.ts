import { NestFactory } from '@nestjs/core';

import { UsersModule } from './users.module';

async function bootstrap() {
    const app = await NestFactory.create(UsersModule);
    const port = 3002;

    await app.listen(port);
}

bootstrap();
