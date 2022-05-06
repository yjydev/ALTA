import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from '@emotion/styled';

import { Member, Problem, Code } from '../../types/StudyType';
import { blackColor, mainColor, subColor } from '../../modules/colorChart';
import { problemBarFrontBuilder } from './builder/ALTA_ProblemBarBuilder';
import {
  addProblemBarBackBuilder,
  addProblemBarFrontBuilder,
} from './builder/ALTA_AddProblemBarBuilder';

import ALTA_FlipBar from '../common/ALTA_FlipBar';

import EditIcon from '@mui/icons-material/Edit';

type Props = {
  problems: Problem[];
  members: Member[];
  maxPeople: number;
  studyId: number;
  scheduleId: number;
};

export default function ALTA_ProblemTable({
  problems,
  members,
  maxPeople,
  studyId,
  scheduleId,
}: Props) {
  return (
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
  );
}

const tableStyle = {
  marginTop: '10px',
};

const tableHeaderStyle = {
  height: '40px',
  backgroundColor: subColor,
};

const tableBodyStyle = {
  'height': '40px',
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(224, 212, 194, 0.3)',
  },
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

const omisstionBtnStyle = {
  color: 'error.main',
};

const problemEditBtnStyle = {
  'position': 'absolute',
  'minWidth': '20px',
  'padding': 0.5,
  'left': 2,
  'cursor': 'pointer',
  'color': blackColor,
  '&:hover': {
    color: 'primary.main',
  },
  '*': {
    fontSize: '20px',
  },
};

const A = styled.a`
  all: unset;
  cursor: pointer;
  &:hover {
    color: ${mainColor};
  }
`;
