import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>) {}

    public createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
        const user = this.usersRepository.create({
            login: createUserDto.login,
            password: createUserDto.password,
        });

        return this.usersRepository.save(user);
    }

    public findAllUsers(): Promise<UsersEntity[]> {
        return this.usersRepository.find({});
    }

    public findUser(userId: number): Promise<UsersEntity | null> {
        return this.usersRepository.findOne({
            where: {
                id: userId,
            },
        });
    }

    public isUserExistByLogin(userLogin: string): Promise<boolean> {
        return this.usersRepository.exist({
            where: {
                login: userLogin,
            },
        });
    }
}
