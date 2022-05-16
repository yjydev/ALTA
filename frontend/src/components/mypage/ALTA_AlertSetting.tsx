import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserDataStore } from '../../context/UserDataContext';

import ALTA_ToggleBtn from './ALTA_ToggleBtn';

type Props = {
  setAlertFold: () => void;
};

export default function ALTA_AlertSetting({ setAlertFold }: Props) {
  return (
    <Grid container>
      {/* <Grid item xs={6} sx={itemStyle}>
        <Typography sx={itemTitleStyle}>알림 수신</Typography>
        <ALTA_ToggleBtn target="siteSolutionAlert">풀이</ALTA_ToggleBtn>
        <ALTA_ToggleBtn target="siteCommnetAlert">코멘트</ALTA_ToggleBtn>
      </Grid>
      <Grid item xs={6} sx={itemStyle}>
        <Typography sx={itemTitleStyle}>이메일 수신</Typography>
        <ALTA_ToggleBtn target="mailSolutionAlert">코멘트</ALTA_ToggleBtn>
        <ALTA_ToggleBtn target="mailCommnetAlert">일정</ALTA_ToggleBtn>
      </Grid> */}
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
