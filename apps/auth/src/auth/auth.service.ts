import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersEntity } from './interfaces/users-entity';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

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
