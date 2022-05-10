import { Box, Typography, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import scrollStyle from '../../modules/scrollStyle';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { StudyData } from '../../types/StudyType';
import { blackColor } from '../../modules/colorChart';
import {
  addTableBarFrontBuilder,
  addTableBarBackBuilder,
} from './builder/ALTA_AddTableBarBuilder';

import ALTA_ProblemTable from './ALTA_ProblemTable';
import ALTA_FlipBar from '../common/ALTA_FlipBar';
import ALTA_StudyDetailSkeleton from '../skeleton/ALTA_StudyDetailSkeleton';
import styled from '@emotion/styled';
import { generateError } from '../../modules/generateAlert';

export default function ALTA_StudyDetailContents({
  studyId,
}: {
  studyId: number;
}) {
  const navigate = useNavigate();
  const { members, studyData, maxPeople, getStudyDetail, editSchedule } =
    useContext(StudyDetailStore);

  const [loading, setLoading] = useState<boolean>(true);
  const [scheduleEditing, setScheduleEditing] = useState<boolean>(false);

  const edit = async (
    studyId: number,
    scheduleId: number,
    startDate: string,
    endDate: string,
  ) => {
    editSchedule(studyId, scheduleId, startDate, endDate);
  };

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
              .map((roundTable: StudyData, i: number) => (
                <Box sx={{ margin: '30px 0 60px' }} key={i}>
                  <Box sx={sectionStyle}>
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      {`${roundTable.round} 회차 : `}
                      <Input
                        type="text"
                        className={`${scheduleEditing && 'editing'}`}
                        defaultValue={`${roundTable.startDate} ~ ${roundTable.endDate}`}
                        disabled={!scheduleEditing}
                      />
                      <Button
                        sx={scheduleEditBtnStyle}
                        onClick={() => setScheduleEditing(!scheduleEditing)}
                      >
                        {!scheduleEditing && <EditIcon />}
                        {scheduleEditing && (
                          <SaveIcon
                            onClick={() =>
                              edit(
                                studyId,
                                roundTable.id,
                                roundTable.startDate,
                                roundTable.endDate,
                              )
                            }
                          />
                        )}
                      </Button>
                    </Typography>
                  </Box>
                  <ALTA_ProblemTable
                    studyId={studyId}
                    scheduleId={roundTable.id}
                    problems={roundTable.problems}
                    members={members}
                    maxPeople={maxPeople}
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

const sectionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const scheduleEditBtnStyle = {
  'minWidth': '20px',
  'padding': 0.5,
  'cursor': 'pointer',
  'color': blackColor,
  '&:hover': {
    color: 'primary.main',
  },
  '*': {
    fontSize: '20px',
  },
};

const Input = styled.input`
  all: unset;
  width: 200px;
  margin-left: 5px;
  font-size: 16px;
  &.editing {
    background-color: rgba(224, 212, 194, 0.6);
  }
`;
