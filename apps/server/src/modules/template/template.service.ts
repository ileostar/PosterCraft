import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { WorkService } from '../work/work.service';
import { GetTemplateListDto } from './dto/template.dto';
import { work } from '@poster-craft/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class TemplateService {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly workService: WorkService,
  ) {}

  async getTemplatesList(dto: GetTemplateListDto) {
    const result = await this.workService.getPagingList(dto, true, true);
    const count = await this.workService.getPagingList(dto, false, true);
    return {
      count: count.length,
      pageIndex: dto.pageIndex,
      pageSize: dto.pageSize,
      list: result.map((i) => ({
        ...i,
        id: void 0,
        uuid: void 0,
        createdAt: void 0,
        updatedAt: void 0,
        workId: i.uuid,
      })),
    };
  }

  async getUserTemplatesList(userId: string, dto: GetTemplateListDto) {
    const result = await this.workService.getPagingListByUserId(
      userId,
      dto,
      true,
      true,
    );
    const count = await this.workService.getPagingListByUserId(
      userId,
      dto,
      false,
      true,
    );
    return {
      count: count.length,
      pageIndex: dto.pageIndex,
      pageSize: dto.pageSize,
      list: result.map((i) => ({
        ...i,
        id: void 0,
        uuid: void 0,
        createdAt: void 0,
        updatedAt: void 0,
        workId: i.uuid,
      })),
    };
  }

  async getTemplateInfo(workId: string) {
    const res = await this.db.query.work.findFirst({
      where: eq(work.uuid, workId),
    });
    if (!res) throw new Error('工作区ID不存在');
    if (!res.isTemplate) throw new Error('工作区ID不是模版');
    if (!res.isPublic) throw new Error('工作区ID不公开');
    return res;
  }
}
