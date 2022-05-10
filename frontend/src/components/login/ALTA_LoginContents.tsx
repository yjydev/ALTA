import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Link, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import GithubButton from 'react-github-login-button';

import { loginTokenChecker } from '../../modules/LoginTokenChecker';

import Logo from '../../images/logo.png';

export default function ALTA_LoginContents() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (loginTokenChecker() === 2) navigate('/mypage');
  }, []);

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
            {loading ? (
              <>
                <Button disabled>
                  <CircularProgress sx={{ color: '#fff' }} />
                </Button>
              </>
            ) : (
              <>
                <A
                  href={`${process.env.REACT_APP_BUTTON_URL}:8000/githubLogin`}
                  onClick={() => setLoading(true)}
                >
                  <GithubButton
                    label="Github 계정으로 로그인하기"
                    style={{ width: '100%' }}
                  />
                </A>
              </>
            )}
            <Typography sx={[userInput, signUpGuide]}>
              Github 계정이 없으신가요?
              <Link
                href="https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home"
                target="_black"
                sx={{ marginLeft: '10px' }}
              >
                Github 가입하기
              </Link>
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

const signUpGuide = {
  textAlign: 'center',
  fontSize: '14px',
  cursor: 'pointer',
};

const Img = styled.img`
  width: 150px;
`;

const A = styled.a`
  all: unset;
`;

const Button = styled.button`
  width: 100%;
  background-color: #000;
`;
