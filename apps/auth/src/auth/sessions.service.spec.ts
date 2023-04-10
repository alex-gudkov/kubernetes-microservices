import { Test, TestingModule } from '@nestjs/testing';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';

import { SessionsService } from './sessions.service';

describe('SessionsService', () => {
  let sessionsService: SessionsService;
  const mockRedisRepository = {};

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        {
          provide: getRedisConnectionToken(),
          useValue: mockRedisRepository,
        },
      ],
    }).compile();

    sessionsService = testingModule.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(sessionsService).toBeDefined();
  });
});
