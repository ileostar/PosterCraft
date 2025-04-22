import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { string } from 'zod';

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
    required: false,
    description: '工作区内容',
    default: {},
  })
  content: Record<string, any>;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: '是否是模板',
    default: false,
  })
  isTemplate?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: '是否公开',
    default: false,
  })
  isPublic?: boolean;

  @ApiProperty({
    type: Number,
    required: false,
    description: '工作区状态',
    default: 1,
  })
  status?: number;

  @ApiProperty({
    type: String,
    required: false,
    description: '作者',
  })
  author?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '用户ID',
  })
  userId?: string;
}

export class UpdateWorkDto extends OmitType(WorkDto, [
  'title',
  'author',
  'userId',
]) {
  @ApiProperty({
    type: String,
    required: false,
    description: '工作区标题',
  })
  title?: string;
}

export class ResponseWorksListDto {
  @ApiProperty({
    type: Number,
    description: '总条数',
  })
  count: number;

  @ApiProperty({
    type: Array<ResponseWorkInfo>,
    description: '工作区列表数据',
  })
  list: Array<ResponseWorkInfo>;

  @ApiProperty({
    type: Number,
    description: '当前页数',
  })
  pageIndex: number;

  @ApiProperty({
    type: Number,
    description: '每页条数',
  })
  pageSize: number;
}

export class ResponseWorkInfo extends WorkDto {
  @ApiProperty({
    type: String,
    description: '工作区标题',
  })
  workId: string;
}

export class CreateWorkDto extends OmitType(WorkDto, [
  'userId',
  'author',
  'userId',
]) {}

export class GetMyWorksListDto extends PickType(WorkDto, ['isTemplate']) {
  @ApiProperty({
    type: String,
    required: false,
    description: '工作区标题（模糊查询）',
  })
  title?: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: '当前页数',
  })
  pageIndex?: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: '每页条数',
  })
  pageSize?: number;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: '是否公开',
    default: false,
  })
  isPublic?: boolean;
}

export class ResponseURLDto {
  @ApiProperty({
    type: string,
    description: '访问地址',
  })
  url: string;

  @ApiProperty({
    type: string,
    description: '页面ID',
  })
  pageId: string;
}
