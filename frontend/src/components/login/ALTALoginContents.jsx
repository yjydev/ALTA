import { Grid, Box, Typography, TextField, Button, Link } from '@mui/material';
import styled from '@emotion/styled';

export default function ALTALogin() {
  return (
    <Box sx={wrapper}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={5} sx={titleStyle}>
          <Typography color="primary" sx={titleTextStyle}>
            Algorithm Time
          </Typography>
          <Box>
            <Img src="logo.png" alt="" />
          </Box>
        </Grid>
        <Grid item xs={5} sx={{ marginTop: '100px', minWidth: '480px' }}>
          <Box sx={loginForm}>
            <TextField label="아이디" variant="outlined" sx={userInput} />
            <TextField
              label="비밀번호"
              type="password"
              variant="outlined"
              sx={userInput}
            />
            <Button variant="contained" sx={[userInput, loginBtn]}>
              로그인
            </Button>
            <Typography sx={[userInput, signUpGuide]}>
              아직 알타 아이디가 없나요?
              <Link sx={{ marginLeft: '10px' }}>ALTA 가입하기</Link>
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
