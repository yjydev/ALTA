import { Grid, Box, TextField, Button, InputLabel } from '@mui/material';

import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_MemberList() {
  return (
    <Box pt={3}>
      <ALTA_ContentsTitle> 멤버 초대 </ALTA_ContentsTitle>
      <Box sx={wrapper} mt={4}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          columns={14}
          pl={1}
          spacing={2}
        >
          <Grid item xs={2} align="right" pr={2}>
            <InputLabel htmlFor="email-input" sx={emailLabel}>
              이메일
            </InputLabel>
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="email-input"
              variant="outlined"
              placeholder="초대할 사람의 이메일을 입력해주세요"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={3} pl={3} align="left">
            <Button variant="contained" sx={inviteBtn}>
              초대
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// default btn color = primary'rgb(109,152,134,1)' / hover = 'rgb(76, 106, 93)'

const inviteBtn = {
  'backgroundColor': 'secondary.main',
  'color': '#000000',
  '&:hover': {
    backgroundColor: '#AFA291',
  },
};

const emailLabel = {
  fontWeight: 'bold',
  color: '#000000',
};

const wrapper = {
  backgroundColor: '#ffffff',
  height: '4.5rem',
};
