import { user } from '@poster-craft/schema';
import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { DB, DbType } from '../global/providers/db.provider';
import { CreateUserDto } from './dto/user.dto';
import { CacheService } from 'src/cache/cache.service';
import { PhoneOtpLoginDto, RegisterDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(DB) private db: DbType,
    private cacheService: CacheService,
  ) {}

  async createUser(dto: CreateUserDto) {
    let newUsers;
    if (dto.password) {
      newUsers = {
        ...dto,
        password: await argon2.hash(dto.password),
      };
    } else {
      newUsers = {
        ...dto,
      };
    }
    const [res] = await this.db.insert(user).values(newUsers);
    return {
      userId: res.insertId,
    };
  }

  async findUserByUsername(username: string): Promise<any> {
    return this.db.query.user.findFirst({
      where: eq(user.username, username),
    });
  }

  findUserByProvider(providerId: string) {
    return this.db.query.user.findFirst({
      where: eq(user.providerId, providerId),
    });
  }

  async findUserByEmail(email: string): Promise<any> {
    return this.db.query.user.findFirst({
      where: eq(user.email, email),
    });
  }

  async findWithPhone(phone: string) {
    return this.db.query.user.findFirst({
      where: eq(user.phone, phone),
    });
  }

  /** 校验验证码是否正确 */
  async checkVerificationCode(
    dto: RegisterDto | PhoneOtpLoginDto,
  ): Promise<Boolean> {
    const correctCode = await this.cacheService.getCache(dto.phone);
    return correctCode === dto.otp;
  }

  async findUserByUserId(userId: number) {
    return this.db.query.user.findFirst({
      where: eq(user.id, userId),
    });
  }

  /** 如果用户存在，则返回true；否则返回false */
  async checkUsernameExists(username: string): Promise<boolean> {
    const user = await this.findUserByUsername(username);
    return !!user;
  }

  async checkUserIdExists(userId: number) {
    const user = await this.findUserByUserId(userId);
    return !!user;
  }

  /** 如果用户存在，则返回true；否则返回false */
  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    return !!user;
  }
}
