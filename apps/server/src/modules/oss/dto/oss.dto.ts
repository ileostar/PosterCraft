import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  file: Express.Multer.File;

  @ApiProperty({ description: '文件目录', required: false })
  @IsOptional()
  @IsString()
  directory?: string;
}

export class UploadResponseDto {
  @ApiProperty({ description: '文件访问URL' })
  url: string;

  @ApiProperty({ description: '文件名' })
  filename: string;

  @ApiProperty({ description: '文件大小(bytes)' })
  size: number;
}
