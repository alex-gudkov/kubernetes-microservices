import { Test, TestingModule } from '@nestjs/testing';

import { AuthHttpController } from './auth.http.controller';
import { AuthService } from './auth.service';
import { SessionsService } from './sessions.service';

describe('AuthHttpController', () => {
    let authHttpController: AuthHttpController;
    const mockAuthService = {};
    const mockSessionsService = {};

    beforeAll(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            controllers: [AuthHttpController],
            providers: [AuthService, SessionsService],
        })
            .overrideProvider(AuthService)
            .useValue(mockAuthService)
            .overrideProvider(SessionsService)
            .useValue(mockSessionsService)
            .compile();

        authHttpController = testingModule.get<AuthHttpController>(AuthHttpController);
    });

    it('should be defined', () => {
        expect(authHttpController).toBeDefined();
    });
});
