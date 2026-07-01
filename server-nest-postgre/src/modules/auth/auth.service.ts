import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AdminLoginDto } from './dto/admin-login.dto';

const SALT_ROUNDS = 10;
const ONE_HOUR = 60 * 60;
const ONE_YEAR = 365 * 24 * 60 * 60;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    // Fix vs. the Express version, which stored the raw password.
    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashedPassword,
        // role defaults to 'user' in the schema; never set from client input.
        phoneNumber: dto.phoneNumber,
        bio: dto.bio,
      },
    });

    return {
      message: 'user created successfully',
      newUser: this.sanitize(user),
      token: this.signToken(user, ONE_YEAR),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('user not found');

    await this.verifyPassword(dto.password, user.password);

    const expiresIn = dto.rememberMe ? ONE_YEAR : ONE_HOUR;
    return { user: this.sanitize(user), token: this.signToken(user, expiresIn) };
  }

  async adminLogin(dto: AdminLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('user not found');

    if (user.role !== 'admin' && user.role !== 'superAdmin') {
      throw new UnauthorizedException('Not allowed user');
    }

    await this.verifyPassword(dto.password, user.password);

    return { user: this.sanitize(user), token: this.signToken(user, ONE_YEAR) };
  }

  private async verifyPassword(plain: string, hashed: string) {
    const isMatch = await bcrypt.compare(plain, hashed);
    if (!isMatch) throw new UnauthorizedException('invalid credentials');
  }

  private signToken(user: User, expiresIn: number) {
    return this.jwt.sign({ id: user.id, role: user.role }, { expiresIn });
  }

  private sanitize(user: User) {
    const { password: _password, ...safeUser } = user;
    return safeUser;
  }
}
