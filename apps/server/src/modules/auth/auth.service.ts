import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DefaultLoginDto, PhoneOtpLoginDto, RegisterDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { generateRandomUsername } from 'src/common/utils';
import { ResponseData } from 'src/interceptor/responseData';
import { CallbackUserDataDto } from './dto/oauth2.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /** 默认登录 */
  async defaultLogin(dto: DefaultLoginDto) {
    let user = await this.userService.findUserByUsername(dto.identifier);
    if (!user) {
      user = await this.userService.findUserByEmail(dto.identifier);
      if (!user) throw '用户不存在';
    }
    if (!(await argon2.verify(user.password, dto.password))) throw '密码错误';
    const payload = {
      userId: user.id,
      username: user.username,
      phone: user.phone,
      role: user.role,
      email: user.email,
    };
    return ResponseData.ok(payload, '登录成功', this.jwtService.sign(payload));
  }

  /** 短信登录 */
  async phoneOtpLogin(dto: PhoneOtpLoginDto) {
    const user = await this.userService.findWithPhone(dto.phone);

    let payload;
    if (!user) {
      const randomName = generateRandomUsername();
      const userId = await this.userService.createUser({
        username: randomName,
        phone: dto.phone,
      });
      await this.userService.checkVerificationCode(dto);

      payload = {
        userId: userId,
        username: randomName,
        phone: dto.phone,
        role: 'normal',
      };

      return {
        data: payload,
        msg: '手机号注册并登录成功',
        token: await this.jwtService.sign(payload),
      };
    }
    await this.userService.checkVerificationCode(dto);

    payload = {
      userId: user.id,
      username: user.username,
      nickname: user.nickname,
      avatar: user.avatar,
      phone: user.phone,
      role: user.role,
      email: user.email,
    };
    const jwtToken = this.jwtService.sign(user);
    return {
      data: payload,
      msg: '手机号登录成功',
      token: jwtToken,
    };
  }

  /** Oauth2 */
  async oauthLogin(userData: CallbackUserDataDto) {
    return ResponseData.ok(
      {
        userData,
        isSignUp: userData.phone ? false : true,
      },
      'Oauth2获取用户信息成功',
      this.jwtService.sign(userData),
    );
  }

  /** 默认注册 */
  async signup(dto: RegisterDto) {
    if (await this.userService.findWithPhone(dto.phone)) throw '用户名已存在';
    if (!(await this.userService.checkVerificationCode(dto)))
      throw '手机号校验失败';
    await this.userService.createUser(dto);
  }
}
