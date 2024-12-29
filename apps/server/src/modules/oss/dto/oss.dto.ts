import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { extname } from 'path';

export class UpdateUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  file: any;

  validateFileTypes(fileTypes: string[]) {
    const fileExtName = extname(this['file'].originalname);
    return fileTypes.includes(fileExtName);
  }
}

export class UpdateUploadResponseDto {
  @ApiProperty({ type: 'string' })
  url: string;
}
