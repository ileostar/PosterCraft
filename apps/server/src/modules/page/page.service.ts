import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { work } from '@poster-craft/schema';
import { eq } from 'drizzle-orm';

interface WorkContent {
  Elements: any[];
  pageBackgroundStyle: Record<string, any>;
}

@Injectable()
export class PageService {
  constructor(@Inject(DB) private db: DbType) {}

  /**
   * 将px转换为vw单位
   */
  px2vw(style: any = {}) {
    const reg = /^(\d+(\.\d+)?)px$/;
    const newStyle = { ...style };

    Object.keys(newStyle).forEach((key) => {
      const val = newStyle[key];
      if (typeof val !== 'string') return;
      if (!reg.test(val)) return;

      const arr = val.match(reg) || [];
      const num = parseFloat(arr[1]);
      const vwNum = (num / 375) * 100;
      newStyle[key] = `${vwNum.toFixed(2)}vw`;
    });

    return newStyle;
  }

  /**
   * 将样式对象转换为样式字符串
   */
  propsToStyle(props = {}) {
    return Object.entries(props)
      .map(([key, value]) => {
        const formatKey = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        return `${formatKey}: ${value}`;
      })
      .join(';');
  }

  /**
   * 渲染元素HTML
   */
  renderElement(element: any) {
    const { type, style, content, isHidden } = element;
    if (isHidden) return '';

    const vwStyle = this.px2vw(style);
    const styleStr = this.propsToStyle(vwStyle);

    switch (type) {
      case 'text':
        return `<div style="${styleStr}">${content}</div>`;
      case 'image':
        return `<img src="${content}" style="${styleStr}" />`;
      case 'shape':
        return `<div style="${styleStr}"></div>`;
      default:
        return '';
    }
  }

  /**
   * 渲染页面数据
   */
  async renderToPageData(query: { id: string; uuid: string }) {
    const currentWork = await this.db.query.work.findFirst({
      where: eq(work.uuid, query.uuid),
    });

    if (!currentWork) throw '作品不存在';
    if (!currentWork.isPublic) throw '作品未发布';

    const { title, desc, content } = currentWork;
    const { Elements = [], pageBackgroundStyle = {} } = content as WorkContent;

    // 渲染元素
    const elementsHtml = Elements.map((element) =>
      this.renderElement(element),
    ).join('');

    // 处理背景样式
    const bodyStyle = this.propsToStyle(pageBackgroundStyle);

    return {
      title: title || '海报预览',
      desc: desc || '',
      bodyStyle,
      html: `<div class="poster-container">${elementsHtml}</div>`,
      components: JSON.stringify(Elements),
    };
  }
}
