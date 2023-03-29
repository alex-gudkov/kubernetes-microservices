import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { firstValueFrom } from 'rxjs';
import * as uuid from 'uuid';

import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SessionsEntity } from './interfaces/sessions-entity';
import { UsersEntity } from './interfaces/users-entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRedis() private readonly redisRepository: Redis,
        @Inject('USERS_SERVICE') private readonly usersServiceClient: ClientProxy,
    ) {}

    public async signUpUser(signUpUserDto: SignUpUserDto) {
        const isUserExistByLoginPattern = 'IS_USER_EXIST_BY_LOGIN';
        const isUserExistByLoginPayload = {
            userLogin: signUpUserDto.login,
        };
        const isUserExistByLogin = await firstValueFrom(
            this.usersServiceClient.send<Promise<boolean>>(isUserExistByLoginPattern, isUserExistByLoginPayload),
        );

        if (isUserExistByLogin) {
            throw new BadRequestException('User already exist.');
        }

        const createUserPattern = 'CREATE_USER';
        const createUserPayload = {
            userLogin: signUpUserDto.login,
            userPassword: signUpUserDto.password,
        };
        const user = await firstValueFrom(
            this.usersServiceClient.send<Promise<UsersEntity>>(createUserPattern, createUserPayload),
        );

        return user;
    }

    public async createSession(user: UsersEntity): Promise<SessionsEntity> {
        const userSession: SessionsEntity = {
            id: uuid.v4(),
            userId: user.id,
        };
        const sessionsEntityString = JSON.stringify(userSession);

        await this.redisRepository.set(userSession.id, sessionsEntityString, 'EX', 7 * 24 * 60 * 60); // seconds = 7d * 24h * 60m * 60s

        return userSession;
    }

    public async findSessionById(sessionId: string): Promise<SessionsEntity> {
        const sessionsEntityString = await this.redisRepository.get(sessionId);

        if (!sessionsEntityString) {
            throw new NotFoundException('Session not found.');
        }

        const userSession: SessionsEntity = JSON.parse(sessionsEntityString);

        return userSession;
    }
}
