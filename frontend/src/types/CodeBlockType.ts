export type ReviewData = {
  review_id: number;
  reviewer_name: string;
  comment: string;
  comment_date: Date;
  code_number: number;
  completed?: boolean;
};

export type CodeData = {
  code: string;
  create_date: Date;
  file_name: string;
  language: string;
};

export const defaultCodeData = {
  code: '',
  create_date: new Date(),
  file_name: '',
  language: '',
};

export type PostReview = {
  code_id: number;
  content: string;
  line: number;
};

export type CodeProps = {
  studyId: string | undefined;
  codeId: string | undefined;
};
