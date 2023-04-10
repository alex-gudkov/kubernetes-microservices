import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { WalletsEntity } from './entities/wallets.entity';
import { WalletsService } from './wallets.service';

describe('WalletsService', () => {
  let walletsService: WalletsService;
  const mockUsersRepository = {};
  const mockUsersServiceProvider = {};

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsService,
        {
          provide: getRepositoryToken(WalletsEntity),
          useValue: mockUsersRepository,
        },
        {
          provide: 'USERS_SERVICE',
          useValue: mockUsersServiceProvider,
        },
      ],
    }).compile();

    walletsService = testingModule.get<WalletsService>(WalletsService);
  });

  it('should be defined', () => {
    expect(walletsService).toBeDefined();
  });
});
