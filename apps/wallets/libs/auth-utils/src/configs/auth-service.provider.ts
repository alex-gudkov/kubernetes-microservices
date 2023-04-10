import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  RmqOptions,
  Transport,
  ClientProxyFactory,
  ClientProxy,
  Closeable,
} from '@nestjs/microservices';

export const authServiceProvider: FactoryProvider<ClientProxy & Closeable> = {
  provide: 'AUTH_SERVICE',
  useFactory: (configService: ConfigService): ClientProxy & Closeable => {
    const clientRmqOptions: RmqOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
        queue: 'AUTH',
        queueOptions: {
          durable: false,
        },
      },
    };

    return ClientProxyFactory.create(clientRmqOptions);
  },
  inject: [ConfigService],
};
