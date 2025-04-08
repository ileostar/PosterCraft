import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { work } from '@poster-craft/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PageService {
  constructor(@Inject(DB) private db: DbType) {}

  px2vw(components = []) {
    // '10px' '9.5px'
    const reg = /^(\d+(\.\d+)?)px$/;
    components.forEach((component: any = {}) => {
      const props = component.props || {};
      // 遍历组件的属性
      Object.keys(props).forEach((key) => {
        const val = props[key];
        if (typeof val !== 'string') {
          return;
        }
        // value 中没有 px，不是一个距离的属性
        if (reg.test(val) === false) {
          return;
        }
        const arr = val.match(reg) || [];
        const numStr = arr[1];
        const num = parseFloat(numStr);
        // 计算出 vw，重新赋值
        // 编辑器的画布宽度是 375
        const vwNum = (num / 375) * 100;
        props[key] = `${vwNum.toFixed(2)}vw`;
      });
    });
  }
  propsToStyle(props = {}) {
    const keys = Object.keys(props);
    const styleArr = keys.map((key) => {
      const formatKey = key.replace(
        /[A-Z]/g,
        (c) => `-${c.toLocaleLowerCase()}`,
      );
      // fontSize -> font-size
      const value = props[key];
      return `${formatKey}: ${value}`;
    });
    return styleArr.join(';');
  }

  async renderToPageData(
    query: { id: string; uuid: string },
    isPreview = false,
  ) {
    const currentWork = await this.db.query.work.findFirst({
      where: eq(work.uuid, query.uuid),
    });
    if (!currentWork) throw '工作区不存在';
    if (!currentWork.isPublic && !isPreview) throw '工作区未发布';
    const { title, desc, content } = currentWork;
    // 将组件数据转换为px到vw
    this.px2vw(content.components);

    // 生成HTML字符串
    const html = content.components
      .map((element: any) => {
        // 将props转换为style字符串
        const style = this.propsToStyle(element.props);

        // 根据组件类型生成对应的HTML
        if (element.type === 'text') {
          return `<div style="${style}">${element.text}</div>`;
        }

        return '';
      })
      .join('');

    console.log('===============html=============', html);
    const result = {
      html,
      title,
      desc,
    };
    return result;
  }
}
