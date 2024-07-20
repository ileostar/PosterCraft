import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { UserService } from '../../user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_REDIRECT_URI'),
    });
  }

  async validate(accessToken, refreshToken, profile, cb) {
    const { id: providerId, displayName, emails, photos, provider } = profile;

    this.logger.verbose(JSON.stringify({ ...profile }));
    const user = await this.usersService.findUserByProvider(providerId);
    if (user) {
      return cb(null, user);
    }

    const [{ value: email, verified }] = emails;
    const [{ value: photo }] = photos;
    const userData = {
      provider,
      providerId,
      username: displayName,
      email: email,
      nickname: undefined,
      profileImage: photo,
      thumbnailImage: undefined,
      accessToken,
      refreshToken,
    };
    cb(null, userData);
  }
}
