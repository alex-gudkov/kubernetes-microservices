import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    public createUser(createUserDto: CreateUserDto) {
        return 'createUser';
    }

    public findAllUsers() {
        return 'findAllUsers';
    }

    public findUser(userId: number) {
        return 'findUser';
    }
}
