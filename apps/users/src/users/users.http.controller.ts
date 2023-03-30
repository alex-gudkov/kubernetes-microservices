import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'libs/auth-utils/src';

import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersHttpController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/')
    @UseGuards(AuthGuard)
    public findAllUsers(): Promise<UsersEntity[]> | void {
        return this.usersService.findAllUsers();
    }
}
