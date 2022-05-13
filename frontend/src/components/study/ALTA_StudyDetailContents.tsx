import { Box, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import scrollStyle from '../../modules/scrollStyle';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { TableData } from '../../types/StudyType';
import { generateError } from '../../modules/generateAlert';
import { addTableBarFrontBuilder, addTableBarBackBuilder } from './builder/ALTA_AddTableBarBuilder';

import ALTA_ProblemTable from './ALTA_ProblemTable';
import ALTA_FlipBar from '../common/ALTA_FlipBar';
import ALTA_Loading from '../common/ALTA_Loading';
import ALTA_Inner from '../../components/common/ALTA_Inner';
import ALTA_StudySideContents from '../../components/study/ALTA_StudySideContents';
import ALTA_StudyMembers from '../../components/study/ALTA_StudyMembers';
import ALTA_StudyBoard from '../../components/study/ALTA_StudyBoard';

export default function ALTA_StudyDetailContents({ studyId }: { studyId: number }) {
  const navigate = useNavigate();
  const { readmeData, getStudyDetail, getStudyMembers } = useContext(StudyDetailStore);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function () {
      const [DetailStatus, MemberStatus] = await Promise.all([getStudyDetail(studyId), getStudyMembers(studyId)]);

      if (DetailStatus.status === -1 || MemberStatus.status === -1) navigate('/');
      else if (DetailStatus.status === -2) generateError('스터디 진행 정보를 불러올 수 없습니다', '');
      else if (MemberStatus.status === -2) generateError('스터디 멤버 정보를 불러올 수 없습니다', '');
      else setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading && <ALTA_Loading />}
      {!loading && (
        <Grid sx={gridContainerStyle} container justifyContent="center">
          <Grid item xl={3} lg={6}>
            <ALTA_StudySideContents>
              <ALTA_StudyMembers studyId={studyId} />
            </ALTA_StudySideContents>
          </Grid>
          <Grid item xl={6}>
            <ALTA_Inner>
              <Box sx={[addTableWrapperBarStyle, scrollStyle]}>
                <Box sx={addTableBarWrapperStyle}>
                  <ALTA_FlipBar
                    height="80px"
                    Front={addTableBarFrontBuilder()}
                    Back={addTableBarBackBuilder(studyId, getStudyDetail)}
                  />
                </Box>
                <Box sx={{ position: 'relative', marginTop: '150px' }}>
                  {readmeData
                    .map(
                      (table: TableData): JSX.Element => (
                        <Box sx={tableWrapperStyle} key={table.id}>
                          <ALTA_ProblemTable
                            studyId={studyId}
                            scheduleId={table.id}
                            problems={table.problems}
                            table={table}
                          />
                        </Box>
                      ),
                    )
                    .reverse()}
                </Box>
              </Box>
            </ALTA_Inner>
          </Grid>
          <Grid item xl={3} lg={6}>
            <ALTA_StudySideContents>
              <ALTA_StudyBoard studyId={studyId} />
            </ALTA_StudySideContents>
          </Grid>
        </Grid>
      )}
    </>
  );
}

const gridContainerStyle = { height: '100%', padding: '20px 0' };

const addTableWrapperBarStyle = {
  width: '100%',
  minWidth: '900px',
  height: '85vh',
  padding: '10px 20px',
  paddingBottom: '50px',
  marginBottom: '20px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  overflowY: 'scroll',
};

const addTableBarWrapperStyle = { position: 'relative', marginTop: '30px' };

const tableWrapperStyle = { margin: '30px 0 60px' };
