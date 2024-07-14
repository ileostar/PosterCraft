import { ApiProperty } from '@nestjs/swagger';

export class SendCodeBySMSDto {
  @ApiProperty({
    description: '电话号码列表，这里仅为示例，实际可能支持多个号码',
    type: String,
    example: '14709723891',
  })
  readonly phone: string;
}
