import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersHttpController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/')
    public createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get('/')
    public findAllUsers() {
        return this.usersService.findAllUsers();
    }

    @Get('/:userId')
    public findUser(@Param('userId') userId: number) {
        return this.usersService.findUser(userId);
    }
}
