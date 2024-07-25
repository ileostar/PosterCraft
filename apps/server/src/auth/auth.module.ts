import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { SmsModule } from '../sms/sms.module';
import { CacheModule } from 'src/cache/cache.modules';
import { GithubAuthGuard } from './providers/github/github.auth.guard';
import { GoogleStrategy } from './providers/google/google.strategy';
import { GithubStrategy } from './providers/github/github.strategy';
import { GoogleAuthGuard } from './providers/google/google.auth.guard';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [
    PassportModule,
    HttpModule,
    SmsModule,
    UserModule,
    GatewayModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    GoogleAuthGuard,
    GithubStrategy,
    GithubAuthGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
