import React, { useState } from 'react';
import { Member, RoundTable } from '../types/StudyType';
import { ContextProps } from '../types/ContextPropsType';

//Context 인스턴스 생성
const defaultValue: defaultValueType = {
  maxPeople: 0,
  setMaxPeople: () => null,
  members: [],
  setMembers: () => null,
  roundTables: [],
  setRoundTable: () => null,
};
export const StudyDetailStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function StudyDetailProvider({ children }: ContextProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [roundTables, setRoundTable] = useState<RoundTable[]>([]);
  const [maxPeople, setMaxPeople] = useState<number>(0);

  const value = {
    members,
    setMembers,
    roundTables,
    setRoundTable,
    maxPeople,
    setMaxPeople,
  };
  return (
    <StudyDetailStore.Provider value={value}>
      {children}
    </StudyDetailStore.Provider>
  );
}
//Context 기본값 타입
type defaultValueType = {
  maxPeople: number;
  setMaxPeople: (newData: number) => void;
  members: Member[];
  setMembers: (newData: Member[]) => void;
  roundTables: RoundTable[];
  setRoundTable: (newData: RoundTable[]) => void;
};
