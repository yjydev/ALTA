import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { Member, Problem, Code } from '../../types/StudyType';
import { subColor } from '../../modules/colorChart';
import { useEffect, useState } from 'react';
import path from 'path';

export default function ALTA_ProblemTable({
  problems,
  members,
  maxPeople,
}: Props) {
  const findCode = (nickname: string, codes: Code[]): string | null => {
    for (const code of codes) {
      if (code.nickname === nickname) return code.path;
    }
    return null;
  };

  const SellBtn = (path: string | null) => (
    <Button sx={path ? null : omisstionBtnStyle}>
      {path ? '코드 보기' : '코드 제출'}
    </Button>
  );

  return (
    <Box sx={tableStyle}>
      <Box>
        <Box>
          <Grid container sx={tableHeaderStyle}>
            <Grid item xs={5} sx={sellStyle}>
              <Typography>제목</Typography>
            </Grid>
            <Grid item xs={7} sx={sellStyle}>
              <Grid container>
                {members.map((member, i) => (
                  <Grid item key={i} xs={12 / maxPeople} sx={sellStyle}>
                    <Typography>
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
        {problems.map((problem) => (
          <Box key={problem.id} sx={tableBodyStyle}>
            <Box>
              <Grid container>
                <Grid item xs={5} sx={sellStyle}>
                  <Typography>{problem.name}</Typography>
                </Grid>
                <Grid item xs={7} sx={sellStyle}>
                  <Grid container>
                    {members.map((member, i) => (
                      <Grid item key={i} xs={12 / maxPeople} sx={sellStyle}>
                        <Typography>
                          {member.nickname
                            ? SellBtn(findCode(member.nickname, problem.codes))
                            : '-'}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

type Props = {
  problems: Problem[];
  members: Member[];
  maxPeople: number;
};
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
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const omisstionBtnStyle = {
  color: 'error.main',
};
