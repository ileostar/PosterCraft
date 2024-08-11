import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { CreateChannelDto, UpdateChannelDto } from './dto/channel.dto';
import { work } from '../../../../packages/schema';
import { eq, sql } from 'drizzle-orm';
import { v6 as uuidV6 } from 'uuid';

type ChannelProps = {
  name: string;
  channelId: string;
};

interface ResType {
  workId: string;
  channels: Array<ChannelProps>;
}

@Injectable()
export class ChannelService {
  constructor(@Inject(DB) private db: DbType) {}

  async createChannel(workId: string, dto: CreateChannelDto) {
    const old = await this.db.query.work.findFirst({
      where: eq(work.uuid, workId),
    });
    const newChannels = Array.from(old.channels);
    newChannels.push({
      channelId: uuidV6(),
      name: dto.name,
    });
    const res = await this.db
      .update(work)
      .set({
        channels: newChannels,
      })
      .where(eq(work.uuid, workId));
    return res;
  }

  async getChannel(workId: string) {
    return this.db.query.work.findFirst({ where: eq(work.uuid, workId) });
  }

  async updateChannels(channelId: string, dto: UpdateChannelDto) {
    const { currentChannels, currentWorkId } =
      await this.getWorkIdByChannelId(channelId);
    if (!currentWorkId) throw '通道ID不存在';
    const NewVal = currentChannels.map((i) =>
      i.channelId === channelId
        ? {
            channelId,
            name: dto.name,
          }
        : i,
    );
    await this.db
      .update(work)
      .set({
        channels: NewVal,
      })
      .where(eq(work.uuid, currentWorkId));
  }

  async deleteChannel(channelId: string) {
    const { currentChannels, currentWorkId } =
      await this.getWorkIdByChannelId(channelId);
    if (!currentWorkId) throw '通道ID不存在';
    const NewVal = currentChannels.filter((i) => i.channelId !== channelId);
    await this.db
      .update(work)
      .set({
        channels: NewVal,
      })
      .where(eq(work.uuid, currentWorkId));
  }

  private async getWorkIdByChannelId(channelId: string) {
    const works = await this.db.query.work.findMany();
    const res = works.map((i) => ({
      workId: i.uuid,
      channels: i.channels,
    })) as Array<ResType>;
    let currentWorkId;
    let currentChannels: ChannelProps[];
    for (let i = 0; i < res.length; i++) {
      const channels = Array.from(res[i].channels);
      for (let j = 0; j < channels.length; j++) {
        if (channels[j].channelId === channelId) {
          currentWorkId = res[i].workId;
          break; // 跳出内层循环
        }
      }
      if (currentWorkId) {
        currentChannels = res[i].channels;
        break;
      }
    }
    return {
      currentWorkId,
      currentChannels,
    };
  }
}
