import React, { useState } from 'react';
import { LoginData, defaultLoginData } from '../types/LoginDataType';

//Context 인스턴스 생성
const defaultValue: defaultValueType = {
  loginData: defaultLoginData,
  setLoginData: () => null,
};
const LoginDataStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function LoginDataProvider({ children }: Props) {
  const [loginData, setLoginData] = useState<LoginData>(defaultLoginData);
  const value = { loginData, setLoginData };
  return (
    <LoginDataStore.Provider value={value}>{children}</LoginDataStore.Provider>
  );
}

//Props타입
type Props = {
  children: React.ReactNode;
};
//Context 기본값 타입
type defaultValueType = {
  loginData: LoginData;
  setLoginData: (newData: LoginData) => void;
};
