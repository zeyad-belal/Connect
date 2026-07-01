import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ImageKitService } from '../uploads/imagekit.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DashboardUpdateUserDto } from './dto/dashboard-update-user.dto';

const DEFAULT_AVATAR =
  'https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph';

// Reused everywhere we return a user, so the password hash never leaks.
const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  avatar: true,
  avatarID: true,
  phoneNumber: true,
  bio: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageKit: ImageKitService,
  ) {}

  findAll() {
    return this.prisma.user.findMany({ select: userSelect });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        cartItems: { include: { service: { include: { user: true } } } },
      },
    });
    if (!user) throw new NotFoundException('user not found');

    const { password: _password, ...safeUser } = user;
    return { user: safeUser };
  }

  async dashboardUpdate(id: number, dto: DashboardUpdateUserDto) {
    await this.ensureExists(id);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: dto,
      select: userSelect,
    });
    return { message: 'User updated successfully!', updatedUser };
  }

  async update(id: number, dto: UpdateUserDto, file?: Express.Multer.File) {
    const existing = await this.ensureExists(id);

    let avatar = dto.avatar;
    let avatarID = dto.avatarID;

    if (file) {
      // Replacing the avatar: drop the previous ImageKit asset first.
      if (existing.avatarID) {
        await this.imageKit.delete([existing.avatarID]);
      }
      const uploaded = await this.imageKit.upload(file, 'connect-users');
      avatar = uploaded.url;
      avatarID = uploaded.fileId;
    } else if (!avatar && existing.avatarID) {
      // Clearing the avatar back to the default.
      await this.imageKit.delete([existing.avatarID]);
      avatar = DEFAULT_AVATAR;
      avatarID = '';
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        bio: dto.bio,
        avatar,
        avatarID,
      },
      select: userSelect,
    });

    return { user };
  }

  async remove(id: number) {
    await this.ensureExists(id);
    const user = await this.prisma.user.delete({
      where: { id },
      select: userSelect,
    });
    return { user };
  }

  private async ensureExists(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }
}
