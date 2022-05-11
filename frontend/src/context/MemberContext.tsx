import React, { useState } from 'react';
import { Member } from '../types/StudyType';
import { ContextProps } from '../types/ContextPropsType';
import { memberManagementDataApi } from '../api/apis';
import { checkLogin } from '../modules/LoginTokenChecker';

//Context 인스턴스 생성
const defaultValue: defaultValueType = {
  members: [],
  setMembers: () => null,
  studyCode: '',
  setStudyCode: () => null,
  maxPeople: 0,
  setMaxPeople: () => null,
  getMembers: () => null,
};
export const MemberStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function MemberProvider({ children }: ContextProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [studyCode, setStudyCode] = useState<string>('');
  const [maxPeople, setMaxPeople] = useState<number>(0);
  const getMembers = async (studyId: number) => {
    const loginStatus = await checkLogin();
    if (!loginStatus.status)
      return { status: -1, message: 'login token error' };

    try {
      const res = await memberManagementDataApi(studyId);
      setMembers(res.members);
      setStudyCode(res.studyCode);
      return { status: 1, message: 'success get members data' };
    } catch (err) {
      return { status: -2, message: 'fail get members data' };
    }
  };

  const value = {
    members,
    setMembers,
    studyCode,
    setStudyCode,
    maxPeople,
    setMaxPeople,
    getMembers,
  };
  return <MemberStore.Provider value={value}>{children}</MemberStore.Provider>;
}
//Context 기본값 타입
type defaultValueType = {
  maxPeople: number;
  setMaxPeople: (newData: number) => void;
  members: Member[];
  setMembers: (newData: Member[]) => void;
  studyCode: string;
  setStudyCode: (newData: string) => void;
  getMembers: (studyId: number) => any;
};
