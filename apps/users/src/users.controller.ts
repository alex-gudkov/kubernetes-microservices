import { Controller, Get } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/hello')
    public getHello(): string {
        return this.usersService.getHello();
    }
}
