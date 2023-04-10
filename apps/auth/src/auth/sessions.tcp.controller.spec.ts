import { Test, TestingModule } from '@nestjs/testing';

import { SessionsService } from './sessions.service';
import { SessionsTcpController } from './sessions.tcp.controller';

describe('SessionsTcpController', () => {
  let sessionsTcpController: SessionsTcpController;
  const mockSessionsService = {};

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      controllers: [SessionsTcpController],
      providers: [SessionsService],
    })
      .overrideProvider(SessionsService)
      .useValue(mockSessionsService)
      .compile();

    sessionsTcpController = testingModule.get<SessionsTcpController>(SessionsTcpController);
  });

  it('should be defined', () => {
    expect(sessionsTcpController).toBeDefined();
  });
});
