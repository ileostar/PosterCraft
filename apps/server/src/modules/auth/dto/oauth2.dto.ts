import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CallbackUserDataDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'github',
    description: 'OAuth provider name',
    required: true,
  })
  public provider: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1234',
    description: 'User id of OAuth provider',
    required: true,
  })
  public providerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'leoStar',
    description: 'User name of OAuth provider',
    required: true,
  })
  public username: string;

  @IsEmail()
  @ApiProperty({
    example: '030leoStar@gmail.com',
    description: 'Email of OAuth provider',
  })
  public email: string;

  @IsString()
  @ApiProperty({
    example: 'openSource',
    description: 'Nickname of OAuth provider',
  })
  public nickname: string;

  @IsUrl()
  @ApiProperty({
    example: 'https://xxx.net/img_640x640.jpg',
    description: 'Profile Image URL of OAuth provider',
  })
  public profileImage: string;

  @IsUrl()
  @ApiProperty({
    example: 'https://xxx.net/img_640x640.jpg',
    description: 'Thumbnail Image URL of OAuth provider',
  })
  public thumbnailImage: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ngI0v2YUJ9e2UPfBFjlKriIZvXvOGKfgh59hda0v....',
    description: 'AccessToken of OAuth provider',
    required: true,
  })
  public accessToken: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'xxYqH5kUtwiKsyiZqbl5-ElGkDIsMAZUjcKKYJun....',
    description: 'RefreshToken of OAuth provider',
    required: true,
  })
  public refreshToken: string;

  @ApiProperty({
    example: '14709723891',
    description: '手机号码',
  })
  @IsNotEmpty({ message: '手机号码不能为空' })
  @IsString({ message: '手机号码必须是字符串类型' })
  @IsMobilePhone('zh-CN')
  public phone?: string;
}
