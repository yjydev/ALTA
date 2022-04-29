import React, { useState } from 'react';
import { Member, RoundTable } from '../types/StudyType';
import { ContextProps } from '../types/ContextPropsType';

//Context 인스턴스 생성
const defaultValue: defaultValueType = {
  members: [],
  setMembers: () => null,
  roundTable: [],
  setRoundTable: () => null,
};
export const StudyDetailStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function StudyDetailProvider({ children }: ContextProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [roundTable, setRoundTable] = useState<RoundTable[]>([]);

  const value = { members, setMembers, roundTable, setRoundTable };
  return (
    <StudyDetailStore.Provider value={value}>
      {children}
    </StudyDetailStore.Provider>
  );
}
//Context 기본값 타입
type defaultValueType = {
  members: Member[];
  setMembers: (newData: Member[]) => void;
  roundTable: RoundTable[];
  setRoundTable: (newData: RoundTable[]) => void;
};
