import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, LinearProgress, Typography, Alert } from '@mui/material';

import { generateError } from '../../modules/generateAlert';
import { StudyMember, Problem } from '../../types';
import { blackColor, subColor } from '../../modules/colorChart';
import { problemBarFrontBuilder } from './builder/ALTA_ProblemBarBuilder';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { addProblemBarBackBuilder, addProblemBarFrontBuilder } from './builder/ALTA_AddProblemBarBuilder';

import ALTA_FlipBar from '../common/ALTA_FlipBar';
import ALTA_Tooltip from '../common/ALTA_Tooltip';

type Props = {
  problems: Problem[];
  studyId: number;
  scheduleId: number;
  table: any;
};

export default function ALTA_ProblemTable({ problems, studyId, scheduleId, table }: Props) {
  const navigate = useNavigate();
  const { members, maxPeople, editSchedule } = useContext(StudyDetailStore);

  const [scheduleEditing, setScheduleEditing] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<string>(`${table.startDate} ~ ${table.endDate}`);
  const [loading, setLoading] = useState<boolean>(false);

  const edit = async (studyId: number, scheduleId: number, dateString: string): Promise<void> => {
    if (schedule === `${table.startDate} ~ ${table.endDate}`) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2500);
    } else {
      setLoading(true);

      const editApiStatue = await editSchedule(studyId, scheduleId, dateString);

      if (editApiStatue.status === -1) navigate('/');
      else if (editApiStatue.status === -2) generateError('일정을 수정하지 못했습니다', editApiStatue.message);

      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={sectionStyle}>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {`${table.round} 회차 : `}
          <Alert sx={[alertStyle, isError && errorVisible]} severity="error">
            일정에 변화가 없어 반영되지 않습니다
          </Alert>
          {loading && <LinearProgress sx={{ width: '200px', marginLeft: '5px' }} color="secondary" />}
          {!loading && (
            <StyledInput
              type="text"
              className={`${scheduleEditing && 'editing'}`}
              value={schedule}
              disabled={!scheduleEditing}
              onChange={(e) => setSchedule(e.target.value)}
            />
          )}
          <Button sx={scheduleEditBtnStyle} onClick={() => setScheduleEditing(!scheduleEditing)}>
            {!scheduleEditing && (
              <ALTA_Tooltip title="일정 수정하기">
                <EditIcon />
              </ALTA_Tooltip>
            )}
            {scheduleEditing && (
              <ALTA_Tooltip title="저장하기">
                <SaveIcon onClick={() => edit(studyId, table.id, schedule)} />
              </ALTA_Tooltip>
            )}
          </Button>
        </Box>
      </Box>
      <Box sx={tableStyle}>
        <Box>
          <Box>
            <Grid container sx={tableHeaderStyle}>
              <Grid item xs={4} sx={[sellStyle, ellipsisStyle]}>
                <Typography>제목</Typography>
              </Grid>
              <Grid item xs={8} sx={[sellStyle, ellipsisStyle]}>
                <Grid container>
                  {members.map(
                    (member: StudyMember, i: number): JSX.Element => (
                      <Grid item key={`${i}-${member.nickname}`} xs={12 / maxPeople} sx={[sellStyle, ellipsisStyle]}>
                        <Typography sx={ellipsisStyle}>{member.nickname ? member.nickname : '-'}</Typography>
                      </Grid>
                    ),
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          {problems &&
            problems.map(
              (problem: Problem): JSX.Element => (
                <Box sx={{ height: '40px' }} key={problem.id}>
                  <ALTA_FlipBar
                    height="40px"
                    Front={problemBarFrontBuilder(problem, members, maxPeople, studyId)}
                    Back={addProblemBarBackBuilder(studyId, scheduleId, problem.name, problem.link, problem.id)}
                  />
                </Box>
              ),
            )}
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
  padding: '0 5px',
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

const StyledInput = styled.input`
  all: unset;
  width: 200px;
  margin-left: 5px;
  font-size: 16px;
  &.editing {
    background-color: rgba(224, 212, 194, 0.6);
  }
`;
