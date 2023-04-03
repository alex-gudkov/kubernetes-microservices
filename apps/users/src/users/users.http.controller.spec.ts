import { Test, TestingModule } from '@nestjs/testing';

import { UsersHttpController } from './users.http.controller';
import { UsersService } from './users.service';

describe('UsersHttpController', () => {
    let usersHttpController: UsersHttpController;
    const mockUsersService = {};

    beforeAll(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            controllers: [UsersHttpController],
            providers: [UsersService],
        })
            .overrideProvider(UsersService)
            .useValue(mockUsersService)
            .compile();

        usersHttpController = testingModule.get<UsersHttpController>(UsersHttpController);
    });

    it('should be defined', () => {
        expect(usersHttpController).toBeDefined();
    });
});
