import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { SessionsEntity } from './interfaces/sessions-entity.interface';
import { SessionsService } from './sessions.service';

@Controller()
export class SessionsTcpController {
  constructor(private readonly sessionsService: SessionsService) {}

  @MessagePattern('FIND_SESSION_BY_ID')
  public findSessionById(@Payload() { sessionId }): Promise<SessionsEntity | null> {
    return this.sessionsService.findSessionById(sessionId);
  }
}
