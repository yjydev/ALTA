export type ReviewData = {
  reviewId: number;
  reviewerName: string;
  imageUrl: string;
  comment: string;
  commentDate: Date;
  codeNumber: number;
  completed: boolean;
};

export type CodeData = {
  code: string;
  createDate: Date;
  fileName: string;
  language: string;
  writer: string;
};

export const defaultCodeData = {
  code: '',
  createDate: new Date(),
  fileName: '',
  language: '',
  writer: '',
};

export type CodeTree = {
  codeId: number;
  id: number;
  path: Array<string>;
};
