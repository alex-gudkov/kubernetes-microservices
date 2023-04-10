import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestWithCurrentUserId } from './interfaces/request-with-current-user-id.interface';

export const CurrentUserIdDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext): number | null => {
    const requestWithCurrentUserId = context.switchToHttp().getRequest<RequestWithCurrentUserId>();

    return requestWithCurrentUserId.currentUserId;
  },
);
