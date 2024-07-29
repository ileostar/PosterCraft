import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class JwtPayloadDto extends PickType(CreateUserDto, [
  'nickname',
  'username',
  'avatar',
  'phone',
  'role',
  'email',
]) {
  @ApiProperty({
    example: 'BC0B2E20-8A78-FD9E-8913-D9B2CFD270F8',
    description: '用户ID不能为空',
  })
  @IsString()
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: string;
}
