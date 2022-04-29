type Alert = {
  id: number;
  contents: string;
  read: boolean;
};

type Study = {
  id: number;
  name: string;
  introduction: string;
  language: string;
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
