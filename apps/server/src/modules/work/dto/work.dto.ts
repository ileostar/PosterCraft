import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

type ChannelProps = {
  name: string;
  id: string;
};

export class WorkDto {
  @ApiProperty({
    type: String,
    description: '工作区标题',
  })
  title: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '工作区域',
  })
  desc?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '封面图片URL',
  })
  coverImg?: string;

  @ApiProperty({
    type: Object,
    description: '工作区内容',
    default: {},
  })
  content: Record<string, any>;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: '是否是模板',
  })
  isTemplate?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: '是否公开',
  })
  isPublic?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: '是否是热门',
  })
  isHot?: boolean;

  @ApiProperty({
    type: Number,
    required: false,
    description: '被使用量',
  })
  copiedCount?: number;

  @ApiProperty({
    type: Number,
    description: '工作区状态',
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
    description: '通道信息',
  })
  channels: Array<ChannelProps>;
}

export class CreateWorkDto extends OmitType(WorkDto, ['userId']) {}

export class GetMyWorksListDto extends PickType(WorkDto, ['isPublic']) {
  @ApiProperty({
    type: String,
    required: false,
    description: '工作区标题',
  })
  title?: string;
  @ApiProperty({
    type: Number,
    required: false,
    description: '当前页数',
  })
  @IsNumber()
  pageIndex?: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: '每页条数',
  })
  @IsNumber()
  pageSize?: number;
}
