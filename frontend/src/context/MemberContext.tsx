import React, { useState } from 'react';
import { Member } from '../types/StudyType';
import { ContextProps } from '../types/ContextPropsType';

//Context 인스턴스 생성
const defaultValue: defaultValueType = {
  members: [],
  setMembers: () => null,
  studyCode: '',
  setStudyCode: () => null,
  maxPeople: 0,
  setMaxPeople: () => null,
};
export const MemberStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function MemberProvider({ children }: ContextProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [studyCode, setStudyCode] = useState<string>('');
  const [maxPeople, setMaxPeople] = useState<number>(0);

  const value = {
    members,
    setMembers,
    studyCode,
    setStudyCode,
    maxPeople,
    setMaxPeople,
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
};
