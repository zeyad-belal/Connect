import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  UpdateOrderChatDto,
  UpdateOrderReviewedDto,
  UpdateOrderStatusDto,
} from './dto/update-order.dto';

const orderInclude = {
  buyer: true,
  seller: true,
  items: { include: { service: { include: { user: true } } } },
} satisfies Prisma.OrderInclude;

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.order.findMany({ include: orderInclude });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: orderInclude,
    });
    if (!order) throw new NotFoundException('Order not found.');
    return order;
  }

  async findByBuyer(buyerId: number) {
    const order = await this.prisma.order.findMany({
      where: { buyerId },
      include: orderInclude,
    });
    return { order };
  }

  async findBySeller(sellerId: number) {
    const orders = await this.prisma.order.findMany({
      where: { sellerId },
      include: orderInclude,
    });
    return { orders };
  }

  async create(dto: CreateOrderDto, buyerId: number) {
    const createdOrder = await this.prisma.order.create({
      data: {
        buyerId,
        sellerId: dto.sellerId,
        items: {
          create: dto.items.map((item) => ({
            serviceId: item.serviceId,
            quantity: item.quantity,
            extras: item.extras as Prisma.InputJsonValue,
            price: item.price,
            time: item.time as Prisma.InputJsonValue,
            status: item.status ?? 'pending',
          })),
        },
      },
      include: orderInclude,
    });
    return { message: 'Order created successfully!', createdOrder };
  }

  async updateStatus(id: number, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) throw new NotFoundException('Order not found!');
    if (order.items.length === 0) {
      throw new BadRequestException('No items found in order.');
    }

    // Mirrors the original: status lives on the (single) order item.
    const updated = await this.prisma.orderItem.update({
      where: { id: order.items[0].id },
      data: { status: dto.status },
      include: { order: { include: orderInclude } },
    });

    return {
      message: 'Order status updated successfully!',
      updatedOrder: updated.order,
    };
  }

  async updateChat(id: number, dto: UpdateOrderChatDto) {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { chatHistory: dto.chatHistory as Prisma.InputJsonValue },
      include: orderInclude,
    });
    return { message: 'Order chat updated successfully!', updatedOrder };
  }

  async updateReviewed(id: number, dto: UpdateOrderReviewedDto) {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { reviewed: dto.reviewed },
      include: orderInclude,
    });
    return {
      message: 'Order review status updated successfully!',
      updatedOrder,
    };
  }

  async remove(id: number) {
    // OrderItems reference the order; remove them first to satisfy the FK.
    await this.prisma.orderItem.deleteMany({ where: { orderId: id } });
    const deletedOrder = await this.prisma.order.delete({
      where: { id },
      include: orderInclude,
    });
    return { message: 'Order deleted successfully!', deletedOrder };
  }
}
