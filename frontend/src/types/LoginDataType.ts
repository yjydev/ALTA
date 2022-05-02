type Alert = {
  id: number;
  contents: string;
  read: boolean;
};

export type Study = {
  id: number;
  name: string;
  introduction: string;
  language: string;
  maxPeople: number;
  joined: number;
};

export type LoginData = {
  nickname: string;
  githubMail: string;
  email: string;
  alertList: Alert[];
  introduction: string;
  time: string;
  languageList: string[];
  profileUrl: string;
  studyList: Study[];
};

export const defaultLoginData = {
  nickname: '',
  githubMail: '',
  email: '',
  alertList: [],
  introduction: '',
  time: '',
  languageList: [],
  profileUrl: '',
  studyList: [],
};
