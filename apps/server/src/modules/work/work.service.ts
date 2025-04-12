import { Inject, Injectable, Logger } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { GetMyWorksListDto, WorkDto } from './dto/work.dto';
import { work } from '@poster-craft/schema';
import { and, eq } from 'drizzle-orm';
import { JwtPayloadDto } from '../auth/dto/jwt.dto';
import { ResponseData } from 'src/interceptor/responseData';
import { GlobalConfig } from 'src/config';

@Injectable()
export class WorkService {
  constructor(@Inject(DB) private db: DbType) {}

  async createEmptyWork(dto: WorkDto) {
    try {
      const res = await this.db.insert(work).values(dto);
      const newWork = await this.db.query.work.findFirst({
        where: eq(work.id, Number(res[0].insertId)),
      });

      return ResponseData.ok(
        {
          ...newWork,
          id: void 0,
          uuid: void 0,
          createdAt: void 0,
          updatedAt: void 0,
          workId: newWork.uuid,
        },
        '创建工作区成功',
      );
    } catch (error) {
      Logger.error('创建工作区失败' + error);
      return ResponseData.fail('创建工作区失败' + error);
    }
  }

  async copyWork(workId: string, callback: JwtPayloadDto) {
    try {
      const copiedWork = await this.db.query.work.findFirst({
        where: eq(work.uuid, workId),
      });
      if (!copiedWork || !copiedWork.isPublic) throw '该工作区不存在或不公开';
      const res = await this.db.insert(work).values({
        ...copiedWork,
        id: void 0,
        uuid: void 0,
        copiedCount: void 0,
        status: void 0,
        userId: callback.userId,
        author: callback.username,
        title: `${copiedWork.title}-复制`,
        isTemplate: false,
      });
      await this.db
        .update(work)
        .set({
          copiedCount: copiedWork.copiedCount + 1,
        })
        .where(eq(work.uuid, workId));
      const copy = await this.db.query.work.findFirst({
        where: eq(work.id, Number(res[0].insertId)),
      });

      return ResponseData.ok(
        {
          ...copy,
          id: void 0,
          uuid: void 0,
          createdAt: void 0,
          updatedAt: void 0,
          workId: copy.uuid,
        },
        '复制工作区成功',
      );
    } catch (error) {
      return ResponseData.fail('复制工作区失败：' + error);
    }
  }

  async getPagingList(
    dto: GetMyWorksListDto,
    isPaging = true,
    isTemplate = false,
  ) {
    return this.db.query.work.findMany({
      where: !isTemplate
        ? (work, { like }) => {
            const conditions = [eq(work.isPublic, true)];

            if (dto.title) {
              conditions.push(like(work.title, `%${dto.title}%`));
            }

            return conditions.length > 0 && and(...conditions);
          }
        : (work, { eq }) =>
            and(eq(work.isPublic, true), eq(work.isTemplate, true)),
      orderBy: (work, { asc }) => asc(work.createdAt),
      ...(isPaging && { limit: Number(dto.pageSize) }),
      ...(isPaging && { offset: (dto.pageIndex - 1) * dto.pageSize }),
    });
  }

  async getPagingListByUserId(
    userId: string,
    dto: GetMyWorksListDto,
    isPaging = true,
    isTemplate = false,
  ) {
    return this.db.query.work.findMany({
      where: !isTemplate
        ? (work, { like, eq }) => {
            // 构建查询条件数组
            const conditions = [eq(work.userId, userId)];

            // 如果有标题搜索，添加标题模糊匹配条件
            if (dto.title) {
              conditions.push(like(work.title, `%${dto.title}%`));
            }

            // 组合所有条件
            return and(...conditions);
          }
        : (work, { eq }) => eq(work.isTemplate, true),
      orderBy: (work, { asc }) => asc(work.createdAt),
      ...(isPaging && { limit: Number(dto.pageSize) }),
      ...(isPaging && { offset: (dto.pageIndex - 1) * dto.pageSize }),
    });
  }

  async getWorksListInfos(dto: GetMyWorksListDto) {
    const result = await this.getPagingList(dto);
    const count = await this.getPagingList(dto, false);

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

  async getUserWorksList(userId: string, dto: GetMyWorksListDto) {
    const result = await this.getPagingListByUserId(userId, dto);
    const count = await this.getPagingListByUserId(userId, dto, false);

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

  async getWorkInfos(workId: string) {
    return this.db.query.work.findFirst({
      where: eq(work.uuid, workId),
    });
  }

  async deleteWork(userId: string, workId: string) {
    return this.db
      .delete(work)
      .where(and(eq(work.uuid, workId), eq(work.userId, userId)));
  }

  async updateWork(workId: string, dto: WorkDto) {
    await this.db.update(work).set(dto).where(eq(work.uuid, workId));
    return {
      workId: workId,
      ...dto,
    };
  }

  async publish(workId: string, isTemplate: boolean) {
    const url = GlobalConfig.url.replace(/\/$/, '');
    const res = await this.db
      .update(work)
      .set({
        status: 2,
        isPublic: true,
        latestPublishAt: new Date(),
        ...(isTemplate && { isTemplate: true }),
      })
      .where(eq(work.uuid, workId));
    if (res[0].affectedRows === 0) throw '工作区ID不存在';
    const workInfo = await this.db.query.work.findFirst({
      where: eq(work.uuid, workId),
    });
    return {
      url: `${url}/pages/${workInfo.id}-${workInfo.uuid}`,
      pageId: `${workInfo.id}-${workInfo.uuid}`,
    };
  }

  async preview(workId: string) {
    const url = GlobalConfig.url.replace(/\/$/, '');
    const res = await this.db
      .update(work)
      .set({
        status: 1,
      })
      .where(eq(work.uuid, workId));
    if (res[0].affectedRows === 0) throw '工作区ID不存在';
    const workInfo = await this.db.query.work.findFirst({
      where: eq(work.uuid, workId),
    });
    return {
      url: `${url}/pages/preview/${workInfo.id}-${workInfo.uuid}`,
      pageId: `${workInfo.id}-${workInfo.uuid}`,
    };
  }
}
