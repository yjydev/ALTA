import { useContext, useState } from 'react';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, LinearProgress, Typography, Alert } from '@mui/material';

import { Problem } from '../../types/StudyType';
import { blackColor, mainColor, subColor } from '../../modules/colorChart';
import { problemBarFrontBuilder } from './builder/ALTA_ProblemBarBuilder';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import {
  addProblemBarBackBuilder,
  addProblemBarFrontBuilder,
} from './builder/ALTA_AddProblemBarBuilder';

import ALTA_FlipBar from '../common/ALTA_FlipBar';
import ALTA_Tooltip from '../common/ALTA_Tooltip';

type Props = {
  problems: Problem[];
  studyId: number;
  scheduleId: number;
  roundTable: any;
};

export default function ALTA_ProblemTable({
  problems,
  studyId,
  scheduleId,
  roundTable,
}: Props) {
  const { members, maxPeople, editSchedule } = useContext(StudyDetailStore);

  const [scheduleEditing, setScheduleEditing] = useState<boolean>(false);
  const [editScheduleError, setEditScheduleError] = useState<boolean>(false);
  const [scheduleString, setScheduleString] = useState<string>(
    `${roundTable.startDate} ~ ${roundTable.endDate}`,
  );
  const [editScheduleLoading, setEditScheduleLoading] =
    useState<boolean>(false);

  const edit = async (
    studyId: number,
    scheduleId: number,
    dateString: string,
  ) => {
    if (scheduleString === `${roundTable.startDate} ~ ${roundTable.endDate}`) {
      setEditScheduleError(true);
      setTimeout(() => {
        setEditScheduleError(false);
      }, 2500);

      return;
    }
    setEditScheduleLoading(true);
    await editSchedule(studyId, scheduleId, dateString);
    setEditScheduleLoading(false);
  };

  return (
    <>
      <Box sx={sectionStyle}>
        <Typography
          sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        >
          {`${roundTable.round} 회차 : `}
          <Alert
            sx={[alertStyle, editScheduleError && errorVisible]}
            severity="error"
          >
            일정에 변화가 없어 반영되지 않습니다
          </Alert>
          {editScheduleLoading && (
            <LinearProgress
              sx={{ width: '200px', marginLeft: '5px' }}
              color="secondary"
            />
          )}
          {!editScheduleLoading && (
            <Input
              type="text"
              className={`${scheduleEditing && 'editing'}`}
              value={scheduleString}
              disabled={!scheduleEditing}
              onChange={(e) => setScheduleString(e.target.value)}
            />
          )}
          <Button
            sx={scheduleEditBtnStyle}
            onClick={() => setScheduleEditing(!scheduleEditing)}
          >
            {!scheduleEditing && (
              <ALTA_Tooltip title="일정 수정하기">
                <EditIcon />
              </ALTA_Tooltip>
            )}
            {scheduleEditing && (
              <ALTA_Tooltip title="저장하기">
                <SaveIcon
                  onClick={() => edit(studyId, roundTable.id, scheduleString)}
                />
              </ALTA_Tooltip>
            )}
          </Button>
        </Typography>
      </Box>
      <Box sx={tableStyle}>
        <Box>
          <Box>
            <Grid container sx={tableHeaderStyle}>
              <Grid item xs={4} sx={sellStyle}>
                <Typography>제목</Typography>
              </Grid>
              <Grid item xs={8} sx={sellStyle}>
                <Grid container>
                  {members.map((member, i) => (
                    <Grid item key={i} xs={12 / maxPeople} sx={sellStyle}>
                      <Typography sx={ellipsisStyle}>
                        {member.nickname ? member.nickname : '-'}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          {problems &&
            problems.map((problem) => (
              <Box sx={{ height: '40px' }} key={problem.id}>
                <ALTA_FlipBar
                  height="40px"
                  Front={problemBarFrontBuilder(
                    problem,
                    members,
                    maxPeople,
                    studyId,
                  )}
                  Back={addProblemBarBackBuilder(
                    studyId,
                    scheduleId,
                    problem.name,
                    problem.link,
                    problem.id,
                  )}
                />
              </Box>
            ))}
        </Box>
        <ALTA_FlipBar
          height="40px"
          Front={addProblemBarFrontBuilder()}
          Back={addProblemBarBackBuilder(studyId, scheduleId)}
        />
      </Box>
    </>
  );
}

const tableStyle = {
  marginTop: '10px',
};

const tableHeaderStyle = {
  height: '40px',
  backgroundColor: subColor,
};

const sellStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const ellipsisStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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

const alertStyle = {
  position: 'absolute',
  bottom: 30,
  margin: 0,
  marginLeft: 1,
  padding: '0 10px',
  opacity: 0,
  transition: 'opacity .3s',
};

const errorVisible = {
  opacity: 1,
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
