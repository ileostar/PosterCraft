import { ApiProperty, OmitType } from '@nestjs/swagger';

type ChannelProps = {
  name: string;
  id: string;
};

export class WorkDto {
  @ApiProperty({
    type: String,
    description: 'Title of the work',
    required: true,
  })
  title: string;

  @ApiProperty({
    type: String,
    description: '工作区域',
  })
  desc?: string;

  @ApiProperty({
    type: String,
    description: '封面图片URL',
  })
  coverImg?: string;

  @ApiProperty({
    type: Object,
    description: 'Content of the work',
    default: {},
  })
  content: Record<string, any>;

  @ApiProperty({
    type: Boolean,
    description: '是否是模板',
  })
  isTemplate?: boolean;

  @ApiProperty({
    type: Boolean,
    description: '是否公开',
  })
  isPublic?: boolean;

  @ApiProperty({
    type: Boolean,
    description: '是否是热门',
  })
  isHot?: boolean;

  @ApiProperty({
    type: Number,
    description: '被使用量',
  })
  copiedCount?: number;

  @ApiProperty({
    type: Number,
    description: 'Status of the work',
    default: 1,
  })
  status: number;

  @ApiProperty({
    type: String,
    description: '作者',
  })
  author: string;

  @ApiProperty({
    type: String,
    description: '用户ID',
  })
  userId: string;

  @ApiProperty({
    type: Array<ChannelProps>,
    description: 'Array of channel IDs',
  })
  channels: Array<ChannelProps>;
}

export class CreateWorkDto extends OmitType(WorkDto, ['userId']) {}
