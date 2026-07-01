import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

/**
 * Pulls the authenticated user (set by JwtStrategy.validate) off the request.
 * Replaces the Express `req.user`. Usage: `@CurrentUser() user: User`
 * or `@CurrentUser('id') userId: number`.
 */
export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;
    return data ? user?.[data] : user;
  },
);
