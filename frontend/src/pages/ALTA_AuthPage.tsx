import styled from '@emotion/styled';

import { useContext, useEffect } from 'react';
import { UserDataStore } from '../context/UserDataContext';
import { getRequest } from '../api/request';

import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { whiteColor } from '../modules/colorChart';

export default function ALTA_AuthPage() {
  const navigate = useNavigate();

  const { setUserData } = useContext(UserDataStore);

  const getUserData = async () => {
    const response = await getRequest('/api/user/info');
    console.log(response);
    setUserData(response.userData);
  };

  useEffect(() => {
    const params = new URL(String(window.location)).searchParams;
    const jwt = String(params.get('jwtAT'));
    const refresh = String(params.get('jwtRT'));

    localStorage.setItem('jwt', jwt);
    console.log(localStorage.getItem('jwt'));
    localStorage.setItem('refresh', refresh);
    console.log(localStorage.getItem('refresh'));
    getUserData();
    navigate('/mypage');
  });
  return (
    <Div>
      <CircularProgress color="primary" />
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${whiteColor};
`;
