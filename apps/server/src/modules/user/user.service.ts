import { user } from '@poster-craft/schema';
import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { DB, DbType } from 'src/modules/global/providers/db.provider';
import { CreateUserDto, DeleteUserDto, UpdateUserDto } from './dto/user.dto';
import { CacheService } from '../cache/cache.service';
import { PhoneOtpLoginDto, RegisterDto } from '../auth/dto/auth.dto';
import { ResponseData } from 'src/interceptor/responseData';

@Injectable()
export class UserService {
  constructor(
    @Inject(DB) private db: DbType,
    private cacheService: CacheService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const newUsers = dto.password
      ? {
          ...dto,
          password: await argon2.hash(dto.password),
        }
      : dto;
    const [res] = await this.db.insert(user).values(newUsers);
    return {
      userId: res.insertId,
    };
  }

  async deleteUser(dto: DeleteUserDto) {
    try {
      const res = await this.db.delete(user).where(eq(user.id, dto.userId));
      return ResponseData.ok(res, '删除成功');
    } catch (error) {
      return ResponseData.fail('删除失败：' + error);
    }
  }

  async updateUserInfos(dto: UpdateUserDto) {
    try {
      const old = await this.findUserByUserId(dto.userId);
      if (!old) return ResponseData.fail('用户ID不存在');
      if (dto.username && (await this.checkUsernameExists(dto.username)))
        return ResponseData.fail('用户名已存在');
      await this.db.update(user).set(dto).where(eq(user.id, dto.userId));
      return ResponseData.ok(null, '更新成功');
    } catch (error) {
      return ResponseData.fail('更新用户失败：' + error);
    }
  }

  async findUserByUsername(username: string): Promise<any> {
    return this.db.query.user.findFirst({
      where: eq(user.username, username),
    });
  }
  async findUserByPhone(phone: string): Promise<any> {
    return this.db.query.user.findFirst({
      where: eq(user.phone, phone),
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

  async checkPhoneExists(phone: string) {
    const user = await this.findWithPhone(phone);
    return !!user;
  }

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

  async checkUsernameExists(username: string): Promise<boolean> {
    const user = await this.findUserByUsername(username);
    return !!user;
  }

  async checkUserIdExists(userId: number) {
    const user = await this.findUserByUserId(userId);
    return !!user;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    return !!user;
  }
}
