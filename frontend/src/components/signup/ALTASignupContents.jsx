import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';

export default function ALTASignupContents() {
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
            Sign up for
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
            <TextField
              label="비밀번호 확인"
              type="password"
              variant="outlined"
              sx={userInput}
            />
            <TextField label="이메일" variant="outlined" sx={userInput} />
            <Button variant="contained" sx={[userInput, loginBtn]}>
              회원가입
            </Button>
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

const Img = styled.img`
  width: 150px;
`;
