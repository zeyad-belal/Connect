import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DashboardUpdateUserDto } from './dto/dashboard-update-user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin', 'superAdmin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Roles('admin', 'superAdmin')
  @Patch('dashboard/:id')
  dashboardUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DashboardUpdateUserDto,
  ) {
    return this.usersService.dashboardUpdate(id, dto);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @CurrentUser() requester: User,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    // A user may only edit their own profile; admins may edit anyone.
    const isPrivileged =
      requester.role === 'admin' || requester.role === 'superAdmin';
    if (requester.id !== id && !isPrivileged) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return this.usersService.update(id, dto, file);
  }

  @Roles('superAdmin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
