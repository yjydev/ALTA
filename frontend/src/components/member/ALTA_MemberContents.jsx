import { Grid, Box } from '@mui/material';

import ALTA_MemberTable from './ALTA_MemberTable';
import ALTA_MemberInvite from './ALTA_MemberInvite';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_MemberContents() {
  return (
    <Box pt={3}>
      <Grid container direction="row" sx={wrapper}>
        <Grid item sm={12}>
          <ALTA_ContentsTitle> 멤버 관리 </ALTA_ContentsTitle>
          <ALTA_MemberTable />
        </Grid>
        <Grid item sm={12}>
          <ALTA_ContentsTitle> 멤버 초대 </ALTA_ContentsTitle>
          <ALTA_MemberInvite />
        </Grid>
      </Grid>
    </Box>
  );
}

const wrapper = {
  height: '90vh',
  display: 'flex',
};
