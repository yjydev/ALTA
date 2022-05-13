import React, { useState } from 'react';
import { Member, Column, ContextProps } from '../types';
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
  invitable: true,
  setInvitable: () => null,
  columns: [],
  setColumns: () => null,
};
export const MemberStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function MemberProvider({ children }: ContextProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [studyCode, setStudyCode] = useState<string>('');
  const [maxPeople, setMaxPeople] = useState<number>(0);
  const [invitable, setInvitable] = useState<boolean>(true);
  const [columns, setColumns] = useState<Column[]>([
    // gmail 은 도메인 제외 최대 30자 제한 + 기본적으론 도메인 제외 최대 64자
    { id: 'nickname', label: '닉네임', width: 30 },
    { id: 'email', label: '이메일', width: 150 },
    { id: 'registrationDate', label: '가입일', width: 40 },
    { id: 'state', label: '상태', width: 20 },
    // { id: 'score', label: '점수', width: 15 },
    // { id: 'out', label: '강퇴', width: 30 }
  ]);

  const getMembers = async (studyId: number) => {
    const loginStatus = await checkLogin();
    if (!loginStatus.status) return { status: -1, message: 'login token error' };

    try {
      const res = await memberManagementDataApi(studyId);
      setMembers(res.members);
      setStudyCode(res.studyCode);
      setMaxPeople(res.studyMaxPeople);
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
    invitable,
    setInvitable,
    columns,
    setColumns,
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
  invitable: boolean;
  setInvitable: (newData: boolean) => void;
  columns: Column[];
  setColumns: (newData: Column[]) => void;
};
