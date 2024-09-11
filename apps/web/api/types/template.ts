export type getTemplateResponse = {
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

export type getTemplateListBody = {
  title?: string;
  pageIndex?: number;
  pageSize?: number;
};

export type getTemplateListResponse = {
  count: number;
  pageIndex?: string;
  pageSize?: string;
  list: getTemplateResponse[];
};
