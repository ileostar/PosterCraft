import { Inject, Injectable, Logger } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { GetMyWorksListDto, WorkDto } from './dto/work.dto';
import { work } from '@poster-craft/schema';
import { and, eq } from 'drizzle-orm';
import { JwtPayloadDto } from '../auth/dto/jwt.dto';
import { ResponseData } from 'src/interceptor/responseData';
import { projectConfig } from 'src/config';

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
      if (!copiedWork || !copiedWork.isPublic) {
        throw new Error('can not be copied');
      }
      const newWork = {
        ...copiedWork,
        id: void 0,
        uuid: void 0,
        copiedCount: void 0,
        status: void 0,
        userId: callback.userId,
        author: callback.username,
        title: `${copiedWork.title}-复制`,
        isTemplate: false,
      };
      const res = await this.db.insert(work).values(newWork);
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
      Logger.error('复制工作区失败' + error);
      return ResponseData.fail('复制工作区失败' + error);
    }
  }

  async getWorksListInfos(userId: string, dto: GetMyWorksListDto) {
    const result = await this.getPagingWorksList(userId, dto);
    const count = await this.getPagingWorksList(userId, dto, false);
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

  async publish(userId: string, isTemplate: boolean) {
    const url = projectConfig.url;
    const res = await this.db
      .update(work)
      .set({
        status: 2,
        latestPublishAt: new Date(),
        ...(isTemplate && { isTemplate: true }),
      })
      .where(eq(work.userId, userId));
    const workInfo = await this.db.query.work.findFirst({
      where: eq(work.id, res[0].insertId),
    });
    return `${url}/p/${userId}-${workInfo.uuid}`;
  }

  async getPagingWorksList(
    userId: string,
    dto: GetMyWorksListDto,
    isPaging = true,
    isTemplateList = false,
  ) {
    return this.db.query.work.findMany({
      where: !isTemplateList
        ? (work, { like, eq }) =>
            dto.title
              ? dto.isTemplate
                ? and(
                    eq(work.userId, userId),
                    like(work.title, `%${dto.title}%`),
                    eq(work.isTemplate, dto.isTemplate),
                  )
                : and(
                    eq(work.userId, userId),
                    like(work.title, `%${dto.title}%`),
                  )
              : dto.isTemplate
                ? and(
                    eq(work.userId, userId),
                    eq(work.isTemplate, dto.isTemplate),
                  )
                : eq(work.userId, userId)
        : (work, { eq }) =>
            and(eq(work.isPublic, true), eq(work.isTemplate, true)),
      orderBy: (work, { asc }) => asc(work.createdAt),
      ...(isPaging && { limit: Number(dto.pageSize) }),
      ...(isPaging && { offset: (dto.pageIndex - 1) * dto.pageSize }),
    });
  }
}
