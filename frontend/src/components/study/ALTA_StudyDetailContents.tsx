import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { getRequest } from '../../api/request';

import scrollStyle from '../../modules/scrollStyle';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { RoundTable } from '../../types/StudyType';

import ALTA_ProblemTable from './ALTA_ProblemTable';

export default function ALTA_StudyDetailContents() {
  const { members, roundTables, setRoundTable, maxPeople } =
    useContext(StudyDetailStore);

  const getReadmeContents = async () => {
    const response = await getRequest('/api');
    setRoundTable(response.data.readme);
    console.log(response.data.readme);
  };

  useEffect(() => {
    getReadmeContents();
  }, []);

  return (
    <Box sx={[wrapper, scrollStyle]}>
      {roundTables.map((roundTable: RoundTable, i: number) => (
        <Box sx={{ marginTop: '30px' }} key={i}>
          <Box sx={sectionStyle}>
            <Typography>{`회차 : ${roundTable.startDate} ~ ${roundTable.endDate}`}</Typography>
            <Button variant="contained" sx={addBtnStyle}>
              문제 추가
            </Button>
          </Box>
          <ALTA_ProblemTable
            problems={roundTable.problems}
            members={members}
            maxPeople={maxPeople}
          />
        </Box>
      ))}
    </Box>
  );
}

const wrapper = {
  width: '100%',
  minWidth: '900px',
  height: '85vh',
  padding: '10px 20px',
  paddingBottom: '0.1px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  overflowY: 'scroll',
};

const sectionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const addBtnStyle = {
  height: '25px',
};
