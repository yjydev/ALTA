import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Study } from '../../types';
import scrollStyle from '../../modules/scrollStyle';

import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';
import ALTA_StudyCard from './ALTA_StudyCard';
import ALTA_inviteInput from './ALTA_inviteInput';

type Props = {
  studyList: Study[] | null;
};
export default function ALTA_StudyList({ studyList }: Props) {
  const navigate = useNavigate();

  const goOrganize = (): void => navigate('/organize');
  const goStudyDetail = (studyId: number): void => navigate(`/study/${studyId}/detail`);

  return (
    <Box sx={wrapper}>
      <ALTA_ContentsTitle>스터디 그룹 목록</ALTA_ContentsTitle>
      <h3>스터디 생성하기</h3>
      <Box sx={Btns}>
        <Button variant="contained" onClick={goOrganize}>
          스터디 생성하기
        </Button>
        <h3>초대코드 입력하기</h3>
        <ALTA_inviteInput />
      </Box>
      <h3>참여 스터디 목록</h3>
      <Grid sx={[studyListStyle, scrollStyle]} container spacing={3} mb={3}>
        {studyList &&
          studyList.map((study: Study) => (
            <Grid key={study.id} item xs={6}>
              <h4>{`${study.name}`}</h4>
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
  width: '100%',
  top: '450px',
};

const Btns = {
  display: 'flex',
  justifyContent: 'space-between',
  height: '50px',
};

const studyListStyle = {
  height: '250px',
  overflowY: 'scroll',
  marginTop: 0,
  paddingRight: 0.5,
};
