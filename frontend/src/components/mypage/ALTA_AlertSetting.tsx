import { Grid, Typography } from '@mui/material';

import ALTA_ToggleBtn from './ALTA_ToggleBtn';

export default function ALTA_AlertSetting() {
  return (
    <Grid container>
      <Grid item xs={6} sx={itemStyle}>
        <Typography sx={itemTitleStyle}>알림 수신</Typography>
        <ALTA_ToggleBtn>풀이</ALTA_ToggleBtn>
        <ALTA_ToggleBtn>코멘트</ALTA_ToggleBtn>
      </Grid>
      <Grid item xs={6} sx={itemStyle}>
        <Typography sx={itemTitleStyle}>이메일 수신</Typography>
        <ALTA_ToggleBtn>코멘트</ALTA_ToggleBtn>
        <ALTA_ToggleBtn>일정</ALTA_ToggleBtn>
      </Grid>
    </Grid>
  );
}

const itemTitleStyle = {
  fontSize: '20px',
  marginBottom: '20px',
};

const itemStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
};
