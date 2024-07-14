import { user } from '@poster-craft/schema';
import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { DB, DbType } from '../global/providers/db.provider';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(DB) private db: DbType) {}

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

  /** 如果用户存在，则返回true；否则返回false */
  async checkUsernameExists(username: string): Promise<boolean> {
    const user = await this.findUserByUsername(username);
    return !!user;
  }

  /** 如果用户存在，则返回true；否则返回false */
  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    return !!user;
  }
}
