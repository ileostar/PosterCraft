import { ElementDataType } from "@/types/element-type";

export type createWorkBody = {
  title: string;
  desc: string;
  coverImg: string;
  content: {
    Elements?: Array<ElementDataType>;
    pageBackgroundStyle?: object;
  };
  isTemplate: boolean;
  isPublic: boolean;
  status: number;
};

export type createWorkResponse = {
  title: string;
  desc: string;
  coverImg: string;
  content: object;
  isTemplate: boolean;
  isPublic: boolean;
  isHot: boolean;
  author: string;
  copiedCount: number;
  status: number;
  userId: string;
  workId: string;
};

export type getWorkListBody = {
  pageIndex?: number;
  pageSize?: number;
  title?: string;
};

export type getWorkListResponse = {
  count: number;
  pageIndex?: number;
  pageSize?: number;
  list: createWorkResponse[];
};

export type copyWorkResponse = {
  title: string;
  desc: string;
  coverImg: string;
  content: object;
  isTemplate: boolean;
  isPublic: boolean;
  isHot: boolean;
  author: string;
  copiedCount: number;
  status: number;
  userId: string;
  workId: string;
};

export type getWorkResponse = createWorkBody & {
  author: string;
  userId: string;
  workId: string;
};

export type updateWorkBody = createWorkBody;

export type updateWorkResponse = {
  title: string;
  desc: string;
  coverImg: string;
  content: {
    Elements?: Array<ElementDataType>;
    pageBackgroundStyle?: object;
  };
  isTemplate: boolean;
  isPublic: boolean;
  status: number;
};

export type publishWorkToTemplateResponse = {
  url: string;
  pageId: string;
};
