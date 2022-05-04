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

export type UserData = {
  nickname: string;
  githubMail: string;
  email: string;
  alertList: Alert[];
  introduction: string | null;
  time: string;
  languageList: string[] | null;
  profileUrl: string;
  studyList: Study[];
};

export const defaultUserData = {
  nickname: '',
  githubMail: '',
  email: '',
  alertList: [],
  introduction: null,
  time: '',
  languageList: null,
  profileUrl: '',
  studyList: [],
};
