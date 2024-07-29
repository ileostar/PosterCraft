import { IsNotEmpty } from 'class-validator';
import { UpdateUserDto } from '../../user/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTestUserDto extends UpdateUserDto {
  @ApiProperty({
    example: 13,
    description: '用户ID不能为空',
  })
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: string;
}
