import React, { useState } from 'react';
import {
  ReviewData,
  CodeData,
  defaultCodeData,
  CodeTree,
} from '../types/CodeBlockType';
import { checkLogin } from '../modules/LoginTokenChecker';
import { codeDataApi, reivewDataApi, codeTreeApi } from '../api/apis';

type defaultValueType = {
  code: CodeData;
  setCode: (newCode: CodeData) => void;
  reviews: ReviewData[];
  setReviews: (newReview: ReviewData[]) => void;
  codeLine: number;
  setCodeLine: (newLine: number) => void;
  getCode: (studyId: number, codeId: number) => any;
  getReview: (codeId: number) => any;
  user: string;
  codeTree: CodeTree[];
  setCodeTree: (newData: CodeTree[]) => void;
  getCodeTree: (studyId: number) => any;
};

const defaultValue: defaultValueType = {
  code: defaultCodeData,
  setCode: () => null,
  reviews: [],
  setReviews: () => null,
  codeLine: 0,
  setCodeLine: () => null,
  getCode: () => null,
  getReview: () => null,
  user: '',
  codeTree: [],
  setCodeTree: () => null,
  getCodeTree: () => null,
};
export const CodeStore = React.createContext(defaultValue);

type Props = {
  children: React.ReactNode;
};

export default function CodeContext({ children }: Props) {
  const [code, setCode] = useState<CodeData>(defaultCodeData);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [codeLine, setCodeLine] = useState<number>(0);
  const [codeTree, setCodeTree] = useState<CodeTree[]>([]);

  const getCode = async (studyId: number, codeId: number) => {
    const loginStatus = await checkLogin();
    if (!loginStatus.status)
      return { status: -1, message: 'login token error' };
    try {
      const res = await codeDataApi(studyId, codeId);
      setCode(res);
      return { status: 1, message: 'success get code data' };
    } catch (err) {
      return { status: -2, message: 'fail get code data' };
    }
  };
  const getReview = async (codeId: number) => {
    const loginStatus = await checkLogin();
    if (!loginStatus.status)
      return { status: -1, message: 'login token error' };
    try {
      const res = await reivewDataApi(codeId);
      setReviews(res);
      return { status: 1, message: 'success get review data' };
    } catch (err) {
      return { status: -2, message: 'fail get review data' };
    }
  };
  const getCodeTree = async (studyId: number) => {
    const loginStatus = await checkLogin();
    if (!loginStatus.status)
      return { status: -1, message: 'login token error' };
    try {
      const res = await codeTreeApi(studyId);
      setCodeTree(res);
      return { status: 1, message: 'success get code tree data' };
    } catch (err) {
      return { status: -2, message: 'fail get code tree data' };
    }
  };

  const getuser = localStorage.getItem('UserData');
  const user = getuser ? JSON.parse(getuser)['nickname'] : '';

  const value = {
    code,
    reviews,
    setCode,
    setReviews,
    codeLine,
    setCodeLine,
    getCode,
    getReview,
    user,
    codeTree,
    setCodeTree,
    getCodeTree,
  };
  return <CodeStore.Provider value={value}>{children}</CodeStore.Provider>;
}
