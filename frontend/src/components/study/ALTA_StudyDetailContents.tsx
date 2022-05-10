import { Box, Typography, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkLogin } from '../../modules/LoginTokenChecker';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import scrollStyle from '../../modules/scrollStyle';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { StudyData } from '../../types/StudyType';
import { blackColor } from '../../modules/colorChart';
import { putRequest } from '../../api/request';
import {
  addTableBarFrontBuilder,
  addTableBarBackBuilder,
} from './builder/ALTA_AddTableBarBuilder';

import ALTA_ProblemTable from './ALTA_ProblemTable';
import ALTA_FlipBar from '../common/ALTA_FlipBar';
import ALTA_StudyDetailSkeleton from '../skeleton/ALTA_StudyDetailSkeleton';
import styled from '@emotion/styled';

export default function ALTA_StudyDetailContents({
  studyId,
}: {
  studyId: number;
}) {
  const navigate = useNavigate();
  const { members, studyData, maxPeople, getReadmeContents } =
    useContext(StudyDetailStore);

  const [loading, setLodaing] = useState<boolean>(true);
  const [scheduleEditing, setScheduleEditing] = useState<boolean>(false);

  const editSchedule = async (
    studyId: number,
    scheduleId: number,
    startDate: string,
    endDate: string,
  ) => {
    await checkLogin(() => navigate('/'));

    const requestBody = {
      scheduleId,
      startDate,
      endDate,
    };
    await putRequest(`/api/study/${studyId}/schedule`, requestBody);
  };

  const getData = async () => {
    await getReadmeContents(studyId);
    setLodaing(false);
  };

  useEffect(() => {
    getData();
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
              Back={addTableBarBackBuilder(studyId, getReadmeContents)}
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
                              editSchedule(
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
