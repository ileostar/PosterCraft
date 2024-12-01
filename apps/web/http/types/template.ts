export type GetTemplateResponse = {
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

export type GetTemplateListBody = {
  title?: string;
  pageIndex?: number;
  pageSize?: number;
};

export type GetTemplateListResponse = {
  count: number;
  pageIndex?: string;
  pageSize?: string;
  list: GetTemplateResponse[];
};
