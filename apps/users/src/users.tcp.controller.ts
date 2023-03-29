import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserIdDto } from './dto/user-id.dto';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersTcpController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern('FIND_USER_BY_ID')
    public findUser(@Payload() { userId }: UserIdDto): Promise<UsersEntity | null> {
        return this.usersService.findUser(userId);
    }
}
