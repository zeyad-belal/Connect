import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';

/**
 * Attaches the set of roles allowed to hit a route. Read by RolesGuard.
 * e.g. @Roles('admin', 'superAdmin')
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
