import { Box, Typography, TextField, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import scrollStyle from '../../modules/scrollStyle';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { StudyData } from '../../types/StudyType';
import { blackColor } from '../../modules/colorChart';
import { generateError } from '../../modules/generateAlert';
import { postRequest } from '../../api/request';

import ALTA_ProblemTable from './ALTA_ProblemTable';
import ALTA_AddBar from '../common/ALTA_AddBar';
import ALTA_StudyDetailSkeleton from '../skeleton/ALTA_StudyDetailSkeleton';

export default function ALTA_StudyDetailContents({
  studyId,
}: {
  studyId: number;
}) {
  const { members, studyData, maxPeople, getReadmeContents } =
    useContext(StudyDetailStore);

  const [loading, setLodaing] = useState<boolean>(true);

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
            <ALTA_AddBar
              height="80px"
              front={<Front />}
              back={
                <Back studyId={studyId} getReadmeContents={getReadmeContents} />
              }
            />
          </Box>
          <Box sx={{ position: 'relative', marginTop: '150px' }}>
            {studyData
              .map((roundTable: StudyData, i: number) => (
                <Box sx={{ margin: '30px 0 60px' }} key={i}>
                  <Box sx={sectionStyle}>
                    <Typography>{`${roundTable.round} 회차 : ${roundTable.startDate} ~ ${roundTable.endDate}`}</Typography>
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
//AddBar 부분에 들어가는 front 컴포넌트
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

//AddBar 부분에 들어가는 back 컴포넌트
function Back({
  studyId,
  getReadmeContents,
}: {
  studyId: number;
  getReadmeContents: () => void;
}) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  //Date 인스턴스를 0000-00-00형태의 문자열로 변경
  const refineDate = (date: Date | null): string | null => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    return null;
  };

  const addProblemTable = async () => {
    //unix 시간을 비교하여 시작 > 마감의 경우 예외 처리
    if (startDate && endDate) {
      const unixStartTime = startDate.getTime();
      const unixEndTime = endDate.getTime();

      if (unixStartTime >= unixEndTime) {
        generateError('시작 날짜는 마감 날짜보다 빨리야 합니다', '');
        return;
      }
    }

    const requestData = {
      startDate: refineDate(startDate),
      endDate: refineDate(endDate),
    };

    await postRequest(`/api/study/${studyId}/schedule`, requestData);
    getReadmeContents();

    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'inherit',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex' }}>
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
      <Box>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            addProblemTable();
          }}
        >
          추가
        </Button>
      </Box>
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
