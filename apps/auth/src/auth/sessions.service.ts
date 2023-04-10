import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import * as uuid from 'uuid';

import { SessionsEntity } from './interfaces/sessions-entity.interface';
import { UsersEntity } from './interfaces/users-entity.interface';

@Injectable()
export class SessionsService {
  constructor(@InjectRedis() private readonly redisRepository: Redis) {}

  public async createSession(user: UsersEntity): Promise<SessionsEntity> {
    const userSession: SessionsEntity = {
      id: uuid.v4(),
      userId: user.id,
    };
    const sessionsEntityString = JSON.stringify(userSession);
    const sessionTtlInSeconds = 7 * 24 * 60 * 60;

    await this.redisRepository.set(userSession.id, sessionsEntityString, 'EX', sessionTtlInSeconds);

    return userSession;
  }

  public async findSessionById(sessionId: string): Promise<SessionsEntity | null> {
    const sessionsEntityString = await this.redisRepository.get(sessionId);

    if (!sessionsEntityString) {
      return null;
    }

    const userSession: SessionsEntity = JSON.parse(sessionsEntityString);

    return userSession;
  }
}
