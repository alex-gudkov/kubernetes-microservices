import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;
    const mockUsersServiceProvider = {};

    beforeAll(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: 'USERS_SERVICE',
                    useValue: mockUsersServiceProvider,
                },
            ],
        }).compile();

        authService = testingModule.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });
});
