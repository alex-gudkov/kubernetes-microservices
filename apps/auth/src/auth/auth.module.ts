import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthHttpController } from './auth.http.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({
            secret: '1234567890',
        }),
    ],
    controllers: [AuthHttpController],
    providers: [AuthService],
    exports: [],
})
export class AuthModule {}
