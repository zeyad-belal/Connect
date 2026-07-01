import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  UpdateOrderChatDto,
  UpdateOrderReviewedDto,
  UpdateOrderStatusDto,
} from './dto/update-order.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import {
  OrderAccess,
  OrderOwnershipGuard,
} from '../../common/guards/order-ownership.guard';

function assertSelfOrAdmin(requester: User, targetId: number) {
  const isPrivileged =
    requester.role === 'admin' || requester.role === 'superAdmin';
  if (requester.id !== targetId && !isPrivileged) {
    throw new ForbiddenException('You can only view your own orders');
  }
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Listing every order is an admin-only capability.
  @Roles('admin', 'superAdmin')
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('buyer/:id')
  findByBuyer(
    @Param('id', ParseIntPipe) buyerId: number,
    @CurrentUser() requester: User,
  ) {
    assertSelfOrAdmin(requester, buyerId);
    return this.ordersService.findByBuyer(buyerId);
  }

  @Get('seller/:id')
  findBySeller(
    @Param('id', ParseIntPipe) sellerId: number,
    @CurrentUser() requester: User,
  ) {
    assertSelfOrAdmin(requester, sellerId);
    return this.ordersService.findBySeller(sellerId);
  }

  // OrderOwnershipGuard admits the buyer, seller, or superAdmin only.
  @Get(':id')
  @OrderAccess('buyer', 'seller')
  @UseGuards(OrderOwnershipGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateOrderDto, @CurrentUser('id') buyerId: number) {
    return this.ordersService.create(dto, buyerId);
  }

  @Patch('chat/:id')
  @OrderAccess('buyer', 'seller')
  @UseGuards(OrderOwnershipGuard)
  updateChat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderChatDto,
  ) {
    return this.ordersService.updateChat(id, dto);
  }

  @Patch('reviewed/:id')
  @OrderAccess('buyer', 'seller')
  @UseGuards(OrderOwnershipGuard)
  updateReviewed(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderReviewedDto,
  ) {
    return this.ordersService.updateReviewed(id, dto);
  }

  @Patch(':id')
  @OrderAccess('buyer', 'seller')
  @UseGuards(OrderOwnershipGuard)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(id, dto);
  }

  @Delete(':id')
  @OrderAccess('buyer')
  @UseGuards(OrderOwnershipGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
