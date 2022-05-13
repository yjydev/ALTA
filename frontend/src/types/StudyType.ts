export type OrganizeStudyRequset = {
  [index: string]: string;
  introduction: string;
  isPublic: string;
  language: string;
  maxPeople: string;
  name: string;
  repositoryName: string;
};

export type Member = {
  [index: string]: string;
  nickname: string;
  position: string;
};

export type Code = {
  id: number;
  nickname: string;
  path: string;
};

export type Problem = {
  id: number;
  name: string;
  link: string;
  codes: Code[];
};

export type TableData = {
  id: number;
  startDate: string;
  endDate: string;
  round: number;
  problems: Problem[];
};
