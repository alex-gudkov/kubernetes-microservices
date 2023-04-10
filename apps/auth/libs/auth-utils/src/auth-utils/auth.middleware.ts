import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response, NextFunction } from 'express';
import { firstValueFrom } from 'rxjs';

import { RequestWithCurrentUserId } from './interfaces/request-with-current-user-id.interface';
import { SessionsEntity } from './interfaces/sessions-entity.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@Inject('AUTH_SERVICE') private readonly authServiceProxyClient: ClientProxy) {}

  public async use(request: RequestWithCurrentUserId, response: Response, next: NextFunction): Promise<void> {
    const sessionId = request.cookies['SESSION_ID'];

    if (!sessionId) {
      throw new UnauthorizedException('No SESSION_ID in cookies.');
    }

    const pattern = 'FIND_SESSION_BY_ID';
    const payload = {
      sessionId,
    };
    const session = await firstValueFrom(
      this.authServiceProxyClient.send<Promise<SessionsEntity | null>>(pattern, payload),
    );

    if (session) {
      request.currentUserId = session.userId;
    } else {
      request.currentUserId = null;
    }

    next();
  }
}
