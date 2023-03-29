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
        const accessToken = await this.authService.signAccessToken(user);

        response.cookie('ACCESS_TOKEN', accessToken, {
            httpOnly: true,
        });

        return user;
    }
}
