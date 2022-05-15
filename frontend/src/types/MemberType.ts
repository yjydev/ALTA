export type Member = {
  [index: string]: string;
  id: string;
  nickname: string;
  email: string;
  state: string;
  position: string;
  resistrationData: string;
};

export type Column = {
  id: string;
  label: string;
  width: number;
};

export type userList = {
  id: string;
  email: string;
  nickname: string;
};

export const defaultUser: userList = {
  id: '',
  email: '',
  nickname: '',
};
