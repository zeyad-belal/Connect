import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderOwnershipGuard } from '../../common/guards/order-ownership.guard';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderOwnershipGuard],
})
export class OrdersModule {}
