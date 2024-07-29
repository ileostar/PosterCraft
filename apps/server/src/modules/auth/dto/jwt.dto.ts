import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/user.dto';
import { IsNotEmpty } from 'class-validator';

export class JwtPayloadDto extends PickType(CreateUserDto, [
  'nickname',
  'username',
  'avatar',
  'phone',
  'role',
  'email',
]) {
  @ApiProperty({
    example: 13,
    description: '用户ID不能为空',
  })
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: number;
}
