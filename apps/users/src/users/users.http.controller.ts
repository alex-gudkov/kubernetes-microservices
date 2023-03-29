import { Controller, Get } from '@nestjs/common';

import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersHttpController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/')
    public findAllUsers(): Promise<UsersEntity[]> {
        return this.usersService.findAllUsers();
    }
}
