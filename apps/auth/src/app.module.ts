import { AuthMiddleware, AuthUtilsModule } from '@libs/auth-utils';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    AuthModule,
    AuthUtilsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  public configure(middlewareConsumer: MiddlewareConsumer): void {
    middlewareConsumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/auth/sessions/:sessionId', method: RequestMethod.GET });
  }
}
