import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { whiteColor } from '../modules/colorChart';

export default function ALTA_AuthPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URL(String(window.location)).searchParams;
    const jwt = String(params.get('jwtToken'));

    localStorage.setItem('jwt', jwt);
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
