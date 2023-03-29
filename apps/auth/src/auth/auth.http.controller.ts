import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UsersEntity } from './interfaces/users-entity';

@Controller('/auth')
export class AuthHttpController {
    constructor(private readonly authService: AuthService) {}

    @Post('/sign-up')
    public async signUpUser(
        @Body() signUpUserDto: SignUpUserDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<UsersEntity> {
        const user = await this.authService.signUpUser(signUpUserDto);
        const session = await this.authService.createSession(user);

        response.cookie('SESSION_ID', session.id, {
            httpOnly: true,
        });

        return user;
    }
}
