import { AuthGuard } from '@libs/auth-utils';
import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SessionsEntity } from './interfaces/sessions-entity.interface';
import { UsersEntity } from './interfaces/users-entity.interface';
import { SessionsService } from './sessions.service';

@Controller('/auth')
export class AuthHttpController {
    constructor(private readonly authService: AuthService, private readonly sessionsService: SessionsService) {}

    @Get('/test')
    public getTest(): { message: string } {
        return {
            message: 'Auth microservice test!',
        };
    }

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

    @Get('/sessions/:sessionId')
    @UseGuards(AuthGuard)
    public findSessionById(@Param('sessionId') sessionId: string): Promise<SessionsEntity | null> {
        return this.sessionsService.findSessionById(sessionId);
    }
}
