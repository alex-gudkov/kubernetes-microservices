import { Module } from '@nestjs/common';

import { authServiceProvider } from '../configs/auth-service.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [authServiceProvider],
  exports: [authServiceProvider],
})
export class AuthUtilsModule {}
