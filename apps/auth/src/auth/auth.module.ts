import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, ClientsModule, TcpClientOptions, Transport } from '@nestjs/microservices';

import { AuthHttpController } from './auth.http.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({
            secret: '1234567890',
        }),
        ClientsModule.register([
            {
                name: 'USERS_SERVICE',
                transport: Transport.TCP,
                options: {
                    port: 5002,
                },
            },
        ]),
    ],
    controllers: [AuthHttpController],
    providers: [
        AuthService,
        {
            provide: 'USERS_SERVICE',
            useFactory: () => {
                const clientTcpOptions: TcpClientOptions = {
                    transport: Transport.TCP,
                    options: {
                        port: 5002,
                    },
                };

                return ClientProxyFactory.create(clientTcpOptions);
            },
        },
    ],
    exports: [],
})
export class AuthModule {}
