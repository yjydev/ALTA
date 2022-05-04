import { Box, Grid } from '@mui/material';

import { Study } from '../../types/UserDataType';
import { useContext } from 'react';
import { UserDataStore } from '../../context/UserDataContext';

import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';
import ALTA_StudyCard from './ALTA_StudyCard';
import ALTA_inviteInput from './ALTA_inviteInput';

export default function ALTA_StudyList() {
  const { userData } = useContext(UserDataStore);
  return (
    <Box sx={wrapper}>
      <ALTA_ContentsTitle>스터디 그룹 목록</ALTA_ContentsTitle>
      <Grid mb={3}>
        <ALTA_inviteInput />
      </Grid>
      <Grid sx={studyListStyle} container spacing={3} mb={3}>
        {userData.studyList.map((study: Study) => (
          <Grid key={study.id} item xs={6}>
            <ALTA_StudyCard study={study} />
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
