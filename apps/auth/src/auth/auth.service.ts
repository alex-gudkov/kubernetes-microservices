import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { SignUpUserDto } from './dto/sign-up-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersEntity } from './interfaces/users-entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
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

    public signAccessToken(user: UsersEntity): Promise<string> {
        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const payload: JwtPayload = {
            userId: user.id,
        };

        return this.jwtService.signAsync(payload);
    }

    public async verifyAccessToken(accessToken: string): Promise<number> {
        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(accessToken);

            return payload.userId;
        } catch (error) {
            throw new UnauthorizedException('Invalid access token.');
        }
    }
}
