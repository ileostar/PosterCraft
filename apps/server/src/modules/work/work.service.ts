import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { WorkDto } from './dto/work.dto';
import { work } from '@poster-craft/schema';
import { eq } from 'drizzle-orm';
import { JwtPayloadDto } from '../auth/dto/jwt.dto';
import { ResponseData } from 'src/interceptor/responseData';

@Injectable()
export class WorkService {
  constructor(@Inject(DB) private db: DbType) {}

  async createEmptyWork(dto: WorkDto) {
    try {
      const res = await this.db.insert(work).values(dto);
      return ResponseData.ok(res, '创建工作区成功');
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
        userId: callback.userId,
        author: callback.username,
        copiedCount: 0,
        status: 1,
        title: `${copiedWork.title}-复制`,
        isTemplate: false,
      };
      const res = await this.db.insert(work).values(newWork);
      await this.db.update(work).set({
        copiedCount: copiedWork.copiedCount + 1,
      });
      return ResponseData.ok(res, '复制工作区成功');
    } catch (error) {
      Logger.error('复制工作区失败' + error);
      return ResponseData.fail('复制工作区失败' + error);
    }
  }
}
