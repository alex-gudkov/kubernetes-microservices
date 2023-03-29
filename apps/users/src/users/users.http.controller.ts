import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersHttpController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/')
    public createUser(@Body() createUserDto: CreateUserDto): Promise<UsersEntity> {
        return this.usersService.createUser(createUserDto);
    }

    @Get('/')
    public findAllUsers(): Promise<UsersEntity[]> {
        return this.usersService.findAllUsers();
    }

    @Get('/:userId')
    public findUser(@Param('userId') userId: number): Promise<UsersEntity | null> {
        return this.usersService.findUser(userId);
    }
}
