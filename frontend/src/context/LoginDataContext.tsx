import React, { useState } from 'react';
import { LoginData, defaultLoginData } from '../types/LoginDataType';
import { ContextProps } from '../types/ContextPropsType';

//Context 인스턴스 생성
export const defaultValue: defaultValueType = {
  loginData: defaultLoginData,
  setLoginData: () => null,
};
const LoginDataStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function LoginDataProvider({ children }: ContextProps) {
  const [loginData, setLoginData] = useState<LoginData>(defaultLoginData);
  const value = { loginData, setLoginData };
  return (
    <LoginDataStore.Provider value={value}>{children}</LoginDataStore.Provider>
  );
}

//Context 기본값 타입
type defaultValueType = {
  loginData: LoginData;
  setLoginData: (newData: LoginData) => void;
};
