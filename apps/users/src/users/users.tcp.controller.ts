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
    public findUser(@Payload() { userId }): Promise<UsersEntity | null> {
        return this.usersService.findUser(userId);
    }

    @MessagePattern('IS_USER_EXIST_BY_LOGIN')
    public isUserExistByLogin(@Payload() { userLogin }): Promise<boolean> {
        return this.usersService.isUserExistByLogin(userLogin);
    }
}
