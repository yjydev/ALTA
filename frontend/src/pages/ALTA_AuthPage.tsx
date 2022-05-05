import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { whiteColor } from '../modules/colorChart';

export default function ALTA_AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(String(window.location)).searchParams;
    const jwt = String(params.get('jwtAT'));
    const refresh = String(params.get('jwtRT'));

    localStorage.setItem('jwt', jwt);
    localStorage.setItem('refresh', refresh);

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
