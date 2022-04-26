import { Grid, Box, Typography, TextField, Button } from '@mui/material';

import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_MemberList() {
  return (
    <Box pt={3}>
      <ALTA_ContentsTitle> 멤버 초대 </ALTA_ContentsTitle>
      <Grid container justifyContent="center" alignItems="center" columns={18}>
        <Grid item xs={16}>
          <TextField
            label="email"
            variant="outlined"
            placeholder="초대할 사람의 이메일을 입력해주세요"
            fullWidth
          />
        </Grid>
        <Grid item xs={2} pl={3}>
          <Button variant="contained">초대</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
