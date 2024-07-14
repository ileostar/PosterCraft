import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DefaultLoginDto, PhoneOtpLoginDto, RegisterDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { generateRandomUsername } from 'src/utils';
import { CacheService } from 'src/cache/cache.service';
import { ResponseData } from 'src/response/ResponseFormat';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cacheService: CacheService,
  ) {}

  /** 默认登录 */
  async defaultLogin(dto: DefaultLoginDto) {
    let user = await this.userService.findUserByUsername(dto.identifier);
    if (!user) {
      user = await this.userService.findUserByEmail(dto.identifier);
      if (!user) {
        throw new HttpException('Account not exists', HttpStatus.BAD_REQUEST);
      }
    }
    if (!(await argon2.verify(user.password, dto.password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      userId: user.id,
      username: user.username,
      phone: user.phone,
      role: user.role,
      email: user.email,
    };
    return ResponseData.ok(payload, '手机号登录成功', this.jwtService);
  }

  /** 校验验证码是否正确 */
  async checkVerificationCode(dto: PhoneOtpLoginDto): Promise<Boolean> {
    const correctCode = await this.cacheService.getCache(dto.phone);
    return correctCode === dto.otp;
  }

  /** 短信登录 */
  async phoneOtpLogin(dto: PhoneOtpLoginDto) {
    try {
      const user = await this.userService.findWithPhone(dto.phone);

      if (!user) {
        const randomName = generateRandomUsername();
        const userId = this.userService.createUser({
          username: randomName,
          phone: dto.phone,
        });
        this.checkVerificationCode(dto);

        const payload = {
          userId: userId,
          username: randomName,
          phone: dto.phone,
          role: 'normal',
        };
        const jwtToken = await this.jwtService.signAsync(payload);

        return ResponseData.ok(payload, '手机号注册并登录成功', jwtToken);
      }
      this.checkVerificationCode(dto);

      const jwtToken = this.jwtService.sign(user);
      return ResponseData.ok(user, '手机号登录成功', jwtToken);
    } catch (error) {
      return ResponseData.fail('手机号登录失败');
    }
  }

  /** 默认注册 */
  async signup(dto: RegisterDto) {
    try {
      const user = await this.userService.findWithPhone(dto.phone);
      if (user) {
        return ResponseData.fail('用户名已存在');
      }

      this.checkVerificationCode(dto);

      const res = await this.userService.createUser(dto);
      const jwtToken = this.jwtService.signAsync(res);
      return ResponseData.ok(res, '注册成功', jwtToken);
    } catch (error) {
      throw new Error(error);
    }
  }
}
