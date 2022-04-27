import { Grid, Box, Typography, Button, Link } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import GithubButton from 'react-github-login-button';

import Logo from '../../images/logo.png';

export default function ALTA_LoginContents() {
  const navigate = useNavigate();

  return (
    <Box sx={wrapper}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sx={titleStyle}>
          <Typography color="primary" sx={titleTextStyle}>
            Algorithm Time
          </Typography>
          <Box>
            <Img src={Logo} alt="" />
          </Box>
        </Grid>
        <Grid item xs={5} sx={{ marginTop: '100px', minWidth: '480px' }}>
          <Box sx={loginForm}>
            <GithubButton
              label="Github 계정으로 로그인하기"
              style={{ width: '100%' }}
            />
            <Typography
              sx={[userInput, signUpGuide]}
              onClick={() => navigate('/signup')}
            >
              Github 계정이 없으신가요?
              <Link sx={{ marginLeft: '10px' }}>Github 가입하기</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

//style object
const wrapper = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const titleStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '480px',
};

const titleTextStyle = {
  fontSize: '40px',
  marginRight: '15px',
};

const loginForm = {
  padding: '50px 10px',
};

const userInput = {
  width: '100%',
  marginTop: '10px',
};

const loginBtn = {
  fontSize: '18px',
};

const signUpGuide = {
  textAlign: 'center',
  fontSize: '14px',
  cursor: 'pointer',
};

const Img = styled.img`
  width: 150px;
`;
