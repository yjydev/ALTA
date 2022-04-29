import { Box, Grid } from '@mui/material';

import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';
import ALTA_StudyCard from './ALTA_StudyCard';
import ALTA_inviteInput from './ALTA_inviteInput';

export default function ALTA_StudyList() {
  return (
    <Box sx={wrapper}>
      <ALTA_ContentsTitle>스터디 그룹 목록</ALTA_ContentsTitle>
      <Grid mb={3} align="right">
        <ALTA_inviteInput />
      </Grid>
      <Grid sx={studyListStyle} container spacing={3} mb={3}>
        {[0, 0, 0].map((v, i) => (
          <Grid key={i} item xs={6}>
            <ALTA_StudyCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const wrapper = {
  position: 'absolute',
  minWidth: '100%',
  top: '450px',
};

const studyListStyle = {
  'height': '250px',
  'overflowY': 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};
