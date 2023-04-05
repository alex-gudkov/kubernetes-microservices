import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UsersEntity } from './interfaces/users-entity.interface';

@Injectable()
export class AuthService {
    constructor(@Inject('USERS_SERVICE') private readonly usersServiceClientProxy: ClientProxy) {}

    public async signUpUser(signUpUserDto: SignUpUserDto) {
        if (!signUpUserDto.login) {
            throw new BadRequestException('User login not specified.');
        }

        if (!signUpUserDto.password) {
            throw new BadRequestException('User password not specified.');
        }

        const findUserByLoginPattern = 'FIND_USER_BY_LOGIN';
        const findUserByLoginPayload = {
            userLogin: signUpUserDto.login,
        };
        const candidateUser = await firstValueFrom(
            this.usersServiceClientProxy.send<Promise<UsersEntity>>(findUserByLoginPattern, findUserByLoginPayload),
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
            this.usersServiceClientProxy.send<Promise<UsersEntity>>(createUserPattern, createUserPayload),
        );

        return user;
    }

    public async signInUser(signInUserDto: SignInUserDto): Promise<UsersEntity> {
        if (!signInUserDto.login) {
            throw new BadRequestException('User login not specified.');
        }

        if (!signInUserDto.password) {
            throw new BadRequestException('User password not specified.');
        }

        const pattern = 'FIND_USER_BY_LOGIN';
        const payload = {
            userLogin: signInUserDto.login,
        };
        const user = await firstValueFrom(this.usersServiceClientProxy.send<Promise<UsersEntity>>(pattern, payload));

        if (!user) {
            throw new BadRequestException('User not registered.');
        }

        return user;
    }
}
