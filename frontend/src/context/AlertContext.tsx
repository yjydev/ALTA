import React, { useState } from 'react';
import { AlertData, ContextProps } from '../types';
import { checkLogin } from '../modules/LoginTokenChecker';
import { alertDataApi } from '../api/apis';

//Context 인스턴스 생성
export const defaultValue: defaultValueType = {
  alertData: [],
  setAlertData: () => null,
  getAlertData: () => null,
};
export const AlertDataStore = React.createContext(defaultValue);

type PromiseType = {
  status: number;
  message: string;
};

//Context Provider 컴포넌트
export default function AlertDataProvider({ children }: ContextProps) {
  const [alertData, setAlertData] = useState<AlertData[]>([]);

  const getAlertData = async (): Promise<PromiseType> => {
    const loginStatus = await checkLogin();
    if (!loginStatus.status) return { status: -1, message: 'login token error' };
    try {
      const response = await alertDataApi();
      setAlertData(response);
      return { status: 1, message: 'success get alert data' };
    } catch (err) {
      return { status: -2, message: 'fail get alert data' };
    }
  };

  const value = { alertData, setAlertData, getAlertData };

  return <AlertDataStore.Provider value={value}>{children}</AlertDataStore.Provider>;
}

//Context 기본값 타입
type defaultValueType = {
  alertData: AlertData[];
  setAlertData: (newAlert: AlertData[]) => void;
  getAlertData: () => any;
};
