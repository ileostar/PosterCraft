import { PickType } from '@nestjs/swagger';
import { GetMyWorksListDto } from 'src/modules/work/dto/work.dto';

export class GetTemplateListDto extends PickType(GetMyWorksListDto, [
  'pageIndex',
  'pageSize',
]) {}
