import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UsersEntity } from './interfaces/users-entity.interface';

@Injectable()
export class AuthService {
    constructor(@Inject('USERS_SERVICE') private readonly usersServiceClient: ClientProxy) {}

    public async signUpUser(signUpUserDto: SignUpUserDto) {
        const findUserByLoginPattern = 'FIND_USER_BY_LOGIN';
        const findUserByLoginPayload = {
            userLogin: signUpUserDto.login,
        };
        const candidateUser = await firstValueFrom(
            this.usersServiceClient.send<Promise<UsersEntity>>(findUserByLoginPattern, findUserByLoginPayload),
        );

        if (candidateUser) {
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

    public async signInUser(signInUserDto: SignInUserDto): Promise<UsersEntity> {
        const pattern = 'FIND_USER_BY_LOGIN';
        const payload = {
            userLogin: signInUserDto.login,
        };
        const user = await firstValueFrom(this.usersServiceClient.send<Promise<UsersEntity>>(pattern, payload));

        if (!user) {
            throw new BadRequestException('User not registered.');
        }

        return user;
    }
}
