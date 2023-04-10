import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport, ClientProxyFactory, ClientProxy, Closeable } from '@nestjs/microservices';

export const usersServiceProvider: FactoryProvider<ClientProxy & Closeable> = {
  provide: 'USERS_SERVICE',
  useFactory: (configService: ConfigService): ClientProxy & Closeable => {
    const clientRmqOptions: RmqOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
        queue: 'USERS',
        queueOptions: {
          durable: false,
        },
      },
    };

    return ClientProxyFactory.create(clientRmqOptions);
  },
  inject: [ConfigService],
};
