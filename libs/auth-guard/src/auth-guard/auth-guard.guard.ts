import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';

import { SessionsEntity } from './sessions-entity';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const sessionId = request.cookies['SESSION_ID'];

        if (!sessionId) {
            return false;
        }

        const pattern = 'FIND_SESSION_BY_ID';
        const payload = {
            sessionId,
        };
        const session = await firstValueFrom(
            this.authServiceClient.send<Promise<SessionsEntity | null>>(pattern, payload),
        );

        if (!session) {
            return false;
        }

        return true;
    }
}
