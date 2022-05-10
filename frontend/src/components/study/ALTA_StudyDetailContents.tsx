import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import scrollStyle from '../../modules/scrollStyle';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { StudyData } from '../../types/StudyType';
import {
  addTableBarFrontBuilder,
  addTableBarBackBuilder,
} from './builder/ALTA_AddTableBarBuilder';

import ALTA_ProblemTable from './ALTA_ProblemTable';
import ALTA_FlipBar from '../common/ALTA_FlipBar';
import ALTA_StudyDetailSkeleton from '../skeleton/ALTA_StudyDetailSkeleton';
import { generateError } from '../../modules/generateAlert';

export default function ALTA_StudyDetailContents({
  studyId,
}: {
  studyId: number;
}) {
  const navigate = useNavigate();
  const { studyData, getStudyDetail } = useContext(StudyDetailStore);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function () {
      const status = await getStudyDetail(studyId);

      if (status === -1) navigate('/');
      else if (status === -2)
        generateError('스터디 정보를 불러올 수 없습니다', '');
      else setLoading(false);
    })();
  }, []);

  return (
    <Box sx={[wrapper, scrollStyle]}>
      {loading && <ALTA_StudyDetailSkeleton />}{' '}
      {!loading && (
        <>
          <Box sx={{ position: 'relative', marginTop: '30px' }}>
            <ALTA_FlipBar
              height="80px"
              Front={addTableBarFrontBuilder()}
              Back={addTableBarBackBuilder(studyId, getStudyDetail)}
            />
          </Box>
          <Box sx={{ position: 'relative', marginTop: '150px' }}>
            {studyData
              .map((roundTable: StudyData) => (
                <Box sx={{ margin: '30px 0 60px' }} key={roundTable.id}>
                  <ALTA_ProblemTable
                    studyId={studyId}
                    scheduleId={roundTable.id}
                    problems={roundTable.problems}
                    roundTable={roundTable}
                  />
                </Box>
              ))
              .reverse()}
          </Box>
        </>
      )}
    </Box>
  );
}

const wrapper = {
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
