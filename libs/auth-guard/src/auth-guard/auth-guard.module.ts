import { Module } from '@nestjs/common';
import { ClientsModule, Transport, TcpClientOptions, ClientProxyFactory } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.TCP,
                options: {
                    port: 5001,
                },
            },
        ]),
    ],
    controllers: [],
    providers: [
        {
            provide: 'AUTH_SERVICE',
            useFactory: () => {
                const clientTcpOptions: TcpClientOptions = {
                    transport: Transport.TCP,
                    options: {
                        port: 5001,
                    },
                };

                return ClientProxyFactory.create(clientTcpOptions);
            },
        },
    ],
    exports: [],
})
export class AuthGuardModule {}
