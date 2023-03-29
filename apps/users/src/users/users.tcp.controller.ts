import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersTcpController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern('CREATE_USER')
    public createUser(@Payload() { userLogin, userPassword }): Promise<UsersEntity> {
        const createUserDto: CreateUserDto = {
            login: userLogin,
            password: userPassword,
        };

        return this.usersService.createUser(createUserDto);
    }

    @MessagePattern('FIND_USER_BY_ID')
    public findUserById(@Payload() { userId }): Promise<UsersEntity | null> {
        return this.usersService.findUserById(userId);
    }

    @MessagePattern('FIND_USER_BY_LOGIN')
    public findUserByLogin(@Payload() { userLogin }): Promise<UsersEntity | null> {
        return this.usersService.findUserByLogin(userLogin);
    }
}
