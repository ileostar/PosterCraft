import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { number, string } from 'zod';

export class CreateChannelDto {
  @ApiProperty({
    type: String,
    description: '工作区标题',
  })
  @IsNotEmpty({ message: '通道不能为空' })
  name: string;
}

export class UpdateChannelDto extends CreateChannelDto {}

export class ChannelsDto extends CreateChannelDto {
  @ApiProperty({
    type: string,
    description: '通道ID',
  })
  channelId: string;
}

export class GetChannelsDto {
  @ApiProperty({
    type: number,
    description: '该工作区的通道数量',
  })
  count: number;

  @ApiProperty({
    type: Array<ChannelsDto>,
    description: '该工作区的通道列表',
  })
  list: ChannelsDto;
}
