import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

export const ORDER_ACCESS_KEY = 'orderAccess';
export type OrderParticipant = 'buyer' | 'seller';

/**
 * Declares which order participants may act on the route. superAdmin always
 * passes. e.g. @OrderAccess('buyer') (delete) or @OrderAccess('buyer','seller')
 * (update chat/status).
 */
export const OrderAccess = (...participants: OrderParticipant[]) =>
  SetMetadata(ORDER_ACCESS_KEY, participants);

/**
 * Replaces canDeleteOrder / canUpdateOrder. Loads the order referenced by
 * :id, verifies the authenticated user is an allowed participant (or
 * superAdmin), and stashes the order on the request so the handler can reuse it.
 */
@Injectable()
export class OrderOwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const participants =
      this.reflector.getAllAndOverride<OrderParticipant[]>(ORDER_ACCESS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? ['buyer', 'seller'];

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const orderId = Number(request.params.id);

    if (Number.isNaN(orderId)) {
      throw new NotFoundException('Invalid order id');
    }

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order was not found!');
    }

    if (user.role === 'superAdmin') {
      request.order = order;
      return true;
    }

    const isAllowed = participants.some((p) =>
      p === 'buyer' ? order.buyerId === user.id : order.sellerId === user.id,
    );

    if (!isAllowed) {
      throw new ForbiddenException(
        'You are not authorized to act on this order!',
      );
    }

    request.order = order;
    return true;
  }
}
