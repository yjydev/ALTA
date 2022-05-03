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
  email: string;
  state: string;
  position: string;
  resistrationData: string;
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

export type StudyData = {
  id: number;
  startDate: string;
  endDate: string;
  round: number;
  problems: Problem[];
};
