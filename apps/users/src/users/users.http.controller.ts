import { AuthGuard } from '@libs/auth-utils';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersHttpController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/test')
  public getTest(): { message: string } {
    return {
      message: 'Users microservice test!',
    };
  }

  @Get('/')
  @UseGuards(AuthGuard)
  public findAllUsers(): Promise<UsersEntity[]> | void {
    return this.usersService.findAllUsers();
  }
}
