import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marks a route as accessible without authentication. The global JwtAuthGuard
 * checks for this metadata and skips token verification when present.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
