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
  nickname: string;
  email: string;
  state: string;
  position: string;
  resistrationData: string;
};

type Code = {
  id: number;
  username: string;
  filename: string;
};

type Problem = {
  id: number;
  title: string;
  link: string;
  codes: Code[];
};

export type RoundTable = {
  id: number;
  startData: string;
  endData: string;
  round: number;
  problems: Problem[];
};
