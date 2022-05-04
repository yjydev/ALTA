import React, { useState } from 'react';
import { UserData, defaultUserData } from '../types/UserDataType';
import { ContextProps } from '../types/ContextPropsType';

//Context 인스턴스 생성
export const defaultValue: defaultValueType = {
  userData: defaultUserData,
  setUserData: () => null,
};
export const UserDataStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function UserDataProvider({ children }: ContextProps) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const value = { userData, setUserData };
  return (
    <UserDataStore.Provider value={value}>{children}</UserDataStore.Provider>
  );
}

//Context 기본값 타입
type defaultValueType = {
  userData: UserData;
  setUserData: (newData: UserData) => void;
};
