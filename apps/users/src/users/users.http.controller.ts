import { AuthGuard } from '@libs/auth-guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

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
