import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import scrollStyle from '../../modules/scrollStyle';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { TableData } from '../../types';
import { generateError } from '../../modules/generateAlert';
import { addTableBarFrontBuilder, addTableBarBackBuilder } from './builder/ALTA_AddTableBarBuilder';

import ALTA_ProblemTable from './ALTA_ProblemTable';
import ALTA_FlipBar from '../common/ALTA_FlipBar';
import ALTA_Loading from '../common/ALTA_Loading';
import ALTA_Inner from '../../components/common/ALTA_Inner';
import ALTA_StudyBoard from '../../components/study/ALTA_StudyBoard';

type Params = {
  studyId: string | undefined;
};

export default function ALTA_StudyDetailContents() {
  const { studyId } = useParams<Params>();
  const navigate = useNavigate();
  const { readmeData, getReadmeDetail, getStudyMembers } = useContext(StudyDetailStore);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function () {
      if (studyId) {
        const [readmeApiStatue, memberApiStatus] = await Promise.all([
          getReadmeDetail(Number(studyId)),
          getStudyMembers(Number(studyId)),
        ]);

        if (readmeApiStatue.status === -1 || memberApiStatus.status === -1) navigate('/');
        else if (readmeApiStatue.status === -2)
          generateError('스터디 진행 정보를 불러올 수 없습니다', readmeApiStatue.message);
        else if (memberApiStatus.status === -2)
          generateError('스터디 멤버 정보를 불러올 수 없습니다', memberApiStatus.message);
        else setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading && <ALTA_Loading />}
      {!loading && (
        <Grid sx={gridContainerStyle} container justifyContent="center">
          <Grid item xl={6}>
            <ALTA_Inner>
              <Box sx={[addTableWrapperBarStyle, scrollStyle]}>
                <ALTA_StudyBoard />
                <Box sx={addTableBarWrapperStyle}>
                  <ALTA_FlipBar
                    height="80px"
                    Front={addTableBarFrontBuilder()}
                    Back={addTableBarBackBuilder(Number(studyId), getReadmeDetail)}
                  />
                </Box>
                <Box sx={{ position: 'relative', marginTop: '150px' }}>
                  {readmeData
                    .map(
                      (table: TableData, i: number): JSX.Element => (
                        <Box sx={tableWrapperStyle} key={`${i}-${table.id}`}>
                          <ALTA_ProblemTable
                            studyId={Number(studyId)}
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
