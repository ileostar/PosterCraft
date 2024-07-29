import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CacheModule } from '../cache/cache.modules';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Module({
  imports: [CacheModule],
  providers: [JwtAuthGuard, JwtStrategy, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
