import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github-oauth20';

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
    const { id: providerId, displayName, emails, photos, provider } = profile;

    this.logger.verbose(JSON.stringify({ ...profile }));
    const user = await this.usersService.findUserByProvider(providerId);
    if (user) {
      return cb(null, user);
    }

    let userData;
    const [{ value: photo }] = photos;
    if (emails[0]?.verified) {
      userData = {
        provider,
        providerId,
        username: displayName,
        email: emails[0].value,
        nickname: undefined,
        avatar: photo,
        accessToken,
        refreshToken,
      };
    } else {
      userData = {
        provider,
        providerId,
        username: displayName,
        nickname: undefined,
        avatar: photo,
        accessToken,
        refreshToken,
      };
    }
    cb(null, userData);
  }
}
