import { useEffect } from 'react';
import { loginRequset } from '../api/request';

export default function ALTA_AuthPage() {
  const login = async () => {
    await loginRequset();
  };

  useEffect(() => {
    login();
  });
  return <>리다이</>;
}
