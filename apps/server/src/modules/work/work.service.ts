import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { WorkDto } from './dto/work.dto';
import { work } from '@poster-craft/schema';

@Injectable()
export class WorkService {
  constructor(@Inject(DB) private db: DbType) {}

  async createEmptyWork(dto: WorkDto) {
    try {
      return await this.db.insert(work).values(dto);
    } catch (error) {
      return new Error(error);
    }
  }
}
