import { Grid, Box } from '@mui/material';

import ALTA_MemberList from './ALTA_MemberList';
import ALTA_MemberInvite from './ALTA_MemberInvite';

export default function ALTA_MemberContents() {
  return (
    <Box pt={3}>
      <Grid container direction="column" sx={wrapper}>
        <Grid item xs={8}>
          <ALTA_MemberList />
        </Grid>
        <Grid item xs={4}>
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
