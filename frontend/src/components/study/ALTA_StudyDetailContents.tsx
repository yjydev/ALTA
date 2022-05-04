import { Box, Typography, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getRequest } from '../../api/request';
import AddIcon from '@mui/icons-material/Add';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import scrollStyle from '../../modules/scrollStyle';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { StudyData } from '../../types/StudyType';
import { blackColor } from '../../modules/colorChart';

import ALTA_ProblemTable from './ALTA_ProblemTable';
import ALTA_AddBar from '../common/ALTA_AddBar';

export default function ALTA_StudyDetailContents({
  studyId,
}: {
  studyId: number;
}) {
  const { members, studyData, setStudyData, maxPeople } =
    useContext(StudyDetailStore);

  const getReadmeContents = async () => {
    const response = await getRequest(`/api/study/${studyId}`);
    setStudyData(response.readme);
  };

  useEffect(() => {
    getReadmeContents();
  }, []);

  return (
    <Box sx={[wrapper, scrollStyle]}>
      {studyData.map((roundTable: StudyData, i: number) => (
        <Box sx={{ margin: '30px 0 60px' }} key={i}>
          <Box sx={sectionStyle}>
            <Typography>{`${roundTable.round} 회차 : ${roundTable.startDate} ~ ${roundTable.endDate}`}</Typography>
          </Box>
          <ALTA_ProblemTable
            problems={roundTable.problems}
            members={members}
            maxPeople={maxPeople}
          />
        </Box>
      ))}
      <Box sx={{ position: 'relative', marginTop: '30px' }}>
        <ALTA_AddBar height="80px" front={<Front />} back={<Back />} />
      </Box>
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

function Front() {
  return (
    <>
      <AddIcon sx={{ color: blackColor, opacity: '0.5', fontSize: '40px' }} />
      <Typography sx={{ color: blackColor, opacity: '0.5', fontSize: '14px' }}>
        테이블 추가
      </Typography>
    </>
  );
}

function Back() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: 'inherit',
        width: '100%',
      }}
    >
      <Box sx={{ margin: '0 20px' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['day']}
            label="시작 날짜"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ margin: '0 20px' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['day']}
            label="마감 날짜"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
}
