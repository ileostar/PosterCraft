import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { SmsModule } from '../sms/sms.module';
import { GithubAuthGuard } from './providers/github/github.auth.guard';
import { GoogleStrategy } from './providers/google/google.strategy';
import { GithubStrategy } from './providers/github/github.strategy';
import { GoogleAuthGuard } from './providers/google/google.auth.guard';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { GatewayModule } from 'src/gateway/gateway.module';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Module({
  imports: [PassportModule, HttpModule, SmsModule, UserModule, GatewayModule],
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
