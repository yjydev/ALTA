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
