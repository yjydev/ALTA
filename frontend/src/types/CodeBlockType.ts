export type Review = {
  review_id: number;
  reviewer_name: string;
  comment: string;
  comment_date: Date;
  code_number: number;
  completed: boolean;
};

export type CodeReviewData = {
  code: string;
  reviews: Review[];
  language: string;
};

export const defaultCodeReviewData = {
  code: '',
  reviews: [],
  language: '',
};

export type PostReview = {
  code_id: number;
  content: string;
  line: number;
};
