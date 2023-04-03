import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
    let usersService: UsersService;
    const mockUsersRepository = {};

    beforeAll(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(UsersEntity),
                    useValue: mockUsersRepository,
                },
            ],
        }).compile();

        usersService = testingModule.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(usersService).toBeDefined();
    });
});
