import { user } from '@poster-craft/schema';
import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { DB, DbType } from 'src/modules/global/providers/db.provider';
import {
  AddPasswordDto,
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
} from './dto/user.dto';
import { CacheService } from '../cache/cache.service';
import { PhoneOtpLoginDto, RegisterDto } from '../auth/dto/auth.dto';

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
    return res;
  }

  async deleteUser(userId: string) {
    await this.db.delete(user).where(eq(user.id, userId));
  }

  async updateUserInfos(dto: UpdateUserDto) {
    const old = await this.findUserByUserId(dto.userId);
    if (!old) throw '用户ID不存在';
    if (dto.username) {
      const tempUser = await this.findUserByUsername(dto.username);
      console.log(tempUser, tempUser.userId, dto.userId);
      if (!!tempUser && tempUser.id !== dto.userId) throw '用户名已存在';
    }
    await this.db.update(user).set(dto).where(eq(user.id, dto.userId));
    return dto;
  }

  async addPassword(userId: string, dto: AddPasswordDto) {
    if (dto.password.length < 6 || dto.password.length > 20)
      throw '密码长度应在6-20位之间';
    const currentUser = await this.findUserByUserId(userId);
    if (!currentUser) throw '用户ID不存在';
    if (currentUser.password) throw '用户已设置密码';
    const hash = await argon2.hash(dto.password);
    await this.db
      .update(user)
      .set({ password: hash })
      .where(eq(user.id, userId));
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const currentUser = await this.findUserByUserId(userId);
    if (!user) throw '用户ID不存在';
    if (argon2.verify(currentUser.password, dto.oldPassword))
      throw '旧密码错误';
    const hash = await argon2.hash(dto.newPassword);
    await this.db
      .update(user)
      .set({ password: hash })
      .where(eq(user.id, userId));
  }

  async findAllUsers() {
    return this.db.query.user.findMany();
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
  ): Promise<boolean> {
    const correctCode = await this.cacheService.getCache(dto.phone);
    return correctCode === dto.otp;
  }

  async findUserByUserId(userId: string) {
    return this.db.query.user.findFirst({
      where: eq(user.id, userId),
    });
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const user = await this.findUserByUsername(username);
    return !!user;
  }

  async checkUserIdExists(userId: string) {
    const user = await this.findUserByUserId(userId);
    return !!user;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    console.log(
      '%c🤪 ~ file: user.service.ts:132 [] -> user : ',
      'color: #6e8ec6',
      user,
    );

    return !!user;
  }
}
