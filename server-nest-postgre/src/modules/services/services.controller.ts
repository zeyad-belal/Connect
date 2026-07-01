import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Public()
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Public()
  @Get('filtered/:id')
  findByCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return this.servicesService.findByCategory(categoryId);
  }

  @Public()
  @Get('seller/:id')
  findBySeller(@Param('id', ParseIntPipe) sellerId: number) {
    return this.servicesService.findBySeller(sellerId);
  }

  @Public()
  @Get('filteredFour/:id')
  findLatestByCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return this.servicesService.findLatestByCategory(categoryId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.findOne(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Body() dto: CreateServiceDto,
    @CurrentUser('id') sellerId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.servicesService.create(dto, sellerId, files);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('images'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateServiceDto,
    @CurrentUser() requester: User,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.servicesService.update(id, dto, files, requester);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() requester: User) {
    return this.servicesService.remove(id, requester);
  }
}
