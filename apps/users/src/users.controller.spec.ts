import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users/users.service';
import { UsersTcpController } from './users/users.tcp.controller';

describe('UsersController', () => {
    let usersTcpController: UsersTcpController;
    const mockUsersService = {};

    beforeAll(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            controllers: [UsersTcpController],
            providers: [UsersService],
        })
            .overrideProvider(UsersService)
            .useValue(mockUsersService)
            .compile();

        usersTcpController = testingModule.get<UsersTcpController>(UsersTcpController);
    });

    it('should be defined', () => {
        expect(usersTcpController).toBeDefined();
    });
});
