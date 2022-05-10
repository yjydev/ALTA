import React, { useState } from 'react';
import { UserData, defaultUserData } from '../types/UserDataType';
import { ContextProps } from '../types/ContextPropsType';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../modules/LoginTokenChecker';
import { getRequest } from '../api/request';

//Context 인스턴스 생성
export const defaultValue: defaultValueType = {
  userData: defaultUserData,
  getUserData: () => null,
};
export const UserDataStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function UserDataProvider({ children }: ContextProps) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  const getUserData = async () => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status)
      return { status: false, message: 'login token error' };

    try {
      const response = await getRequest('/api/user/info');

      localStorage.setItem('UserData', JSON.stringify(response.userData));
      setUserData(response.userData);

      return { status: true, message: 'success get user data' };
    } catch (err) {
      return { status: false, message: 'fail get user data' };
    }
  };

  const value = { userData, getUserData };
  return (
    <UserDataStore.Provider value={value}>{children}</UserDataStore.Provider>
  );
}

//Context 기본값 타입
type defaultValueType = {
  userData: UserData;
  getUserData: () => Promise<{
    status: boolean;
    message: string;
  }> | null;
};
