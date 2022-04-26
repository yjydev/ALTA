import { Grid } from '@mui/material';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_Header from '../components/common/ALTA_Header';
import ALTA_StudyDetailContents from '../components/study/ALTA_StudyDetailContents';
import ALTA_StudySideContents from '../components/study/ALTA_StudySideContents';
import ALTA_StudyMembers from '../components/study/ALTA_StudyMembers';
import ALTA_StudyBoard from '../components/study/ALTA_StudyBoard';

export default function ALTA_StudyDetail() {
  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}

//template에 prop로 넘겨줄 컴포넌트
function Header() {
  return <ALTA_Header />;
}

function Contents() {
  return (
    <Grid
      sx={{ height: '100%', padding: '20px 0' }}
      container
      justifyContent="center"
    >
      <Grid item xl={3} lg={0}>
        <ALTA_StudySideContents>
          <ALTA_StudyMembers />
        </ALTA_StudySideContents>
      </Grid>
      <Grid item xl={6}>
        <ALTA_Inner>
          <ALTA_StudyDetailContents />
        </ALTA_Inner>
      </Grid>
      <Grid item xl={3} lg={0}>
        <ALTA_StudySideContents>
          <ALTA_StudyBoard />
        </ALTA_StudySideContents>
      </Grid>
    </Grid>
  );
}
