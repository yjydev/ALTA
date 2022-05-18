import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { generateError } from '../modules/generateAlert';
import { whiteColor } from '../modules/colorChart';

export default function ALTA_AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(String(window.location)).searchParams;
    const error = params.get('error');

    if (error) generateError('로그인에 실패했습니다', '', () => navigate('/'));

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
