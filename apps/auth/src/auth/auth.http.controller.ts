import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UsersEntity } from './interfaces/users-entity';
import { SessionsService } from './sessions.service';

@Controller('/auth')
export class AuthHttpController {
    constructor(private readonly authService: AuthService, private readonly sessionsService: SessionsService) {}

    @Post('/sign-up')
    public async signUpUser(
        @Body() signUpUserDto: SignUpUserDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<UsersEntity> {
        const user = await this.authService.signUpUser(signUpUserDto);
        const session = await this.sessionsService.createSession(user);

        response.cookie('SESSION_ID', session.id, {
            httpOnly: true,
        });

        return user;
    }

    @Post('/sign-in')
    public async signInUser(
        @Body() signInUserDto: SignInUserDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<UsersEntity> {
        const user = await this.authService.signInUser(signInUserDto);
        const session = await this.sessionsService.createSession(user);

        response.cookie('SESSION_ID', session.id, {
            httpOnly: true,
        });

        return user;
    }
}
