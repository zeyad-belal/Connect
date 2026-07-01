import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Status } from '@prisma/client';

class OrderItemDto {
  @IsInt()
  serviceId: number;

  @IsOptional()
  @IsInt()
  quantity?: number;

  // extras/time are free-form JSON blobs carried straight through to Prisma.
  @IsOptional()
  extras?: unknown;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  time?: unknown;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}

export class CreateOrderDto {
  // The buyer is taken from the auth token; only the seller is supplied.
  @IsInt()
  sellerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
