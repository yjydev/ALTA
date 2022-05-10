export type ReviewData = {
  reviewId: number;
  reviewerName: string;
  comment: string;
  commentDate: string;
  codeNumber: number;
  completed?: boolean;
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

export type PostReview = {
  codeId: number;
  content: string;
  line: number;
};

export type CodeProps = {
  studyId: string | undefined;
  codeId: string | undefined;
};
