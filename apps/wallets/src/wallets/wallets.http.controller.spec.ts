import { Test, TestingModule } from '@nestjs/testing';

import { WalletsHttpController } from './wallets.http.controller';
import { WalletsService } from './wallets.service';

describe('WalletsHttpController', () => {
    let walletsHttpController: WalletsHttpController;
    const mockWalletsService = {};

    beforeAll(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            controllers: [WalletsHttpController],
            providers: [WalletsService],
        })
            .overrideProvider(WalletsService)
            .useValue(mockWalletsService)
            .compile();

        walletsHttpController = testingModule.get<WalletsHttpController>(WalletsHttpController);
    });

    it('should be defined', () => {
        expect(walletsHttpController).toBeDefined();
    });
});
