import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github-oauth20';
import validateOauth2 from '../common/validateOauth2';
import { UserService } from '../../../user/user.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(GithubStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_REDIRECT_URI'),
    });
  }

  async validate(accessToken, refreshToken, profile, cb) {
    return validateOauth2(accessToken, refreshToken, profile, cb);
  }
}
