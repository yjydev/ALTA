import { Box, Button, Grid } from '@mui/material';

import { Study } from '../../types/UserDataType';

import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';
import ALTA_StudyCard from './ALTA_StudyCard';
import ALTA_inviteInput from './ALTA_inviteInput';
import { useNavigate } from 'react-router-dom';

export default function ALTA_StudyList({ studyList }: { studyList: Study[] }) {
  const navigate = useNavigate();

  const goOrganize = () => {
    navigate('/organize');
  };
  const goStudyDetail = (studyId: number) => {
    navigate('/study/detail', { state: { studyId } });
  };

  return (
    <Box sx={wrapper}>
      <ALTA_ContentsTitle>스터디 그룹 목록</ALTA_ContentsTitle>
      <Box sx={Btns}>
        <Button variant="contained" onClick={goOrganize}>
          스터디 생성하기
        </Button>
        <ALTA_inviteInput />
      </Box>
      <Grid sx={studyListStyle} container spacing={3} mb={3}>
        {studyList.map((study: Study) => (
          <Grid key={study.id} item xs={6}>
            <Box onClick={() => goStudyDetail(study.id)}>
              <ALTA_StudyCard study={study} />
            </Box>
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

const Btns = {
  display: 'flex',
  justifyContent: 'space-between',
  height: '50px',
};

const studyListStyle = {
  'height': '250px',
  'overflowY': 'scroll',
  'marginTop': 0,
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};
