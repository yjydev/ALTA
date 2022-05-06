import { useContext, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styled from '@emotion/styled';

import { blackColor, subColor, whiteColor } from '../../../modules/colorChart';
import { generateError } from '../../../modules/generateAlert';
import { postRequest, putRequest } from '../../../api/request';
import { StudyDetailStore } from '../../../context/StudyDetailContext';

export const addProblemBarFrontBuilder = () =>
  function Front({ fliper }: { fliper: () => void }) {
    const PlainBtn = styled.button`
      all: unset;
      width: 100%;
      &:active {
        transform: scale(0.99);
      }
      background-color: lightgray;
      &:hover {
        background-color: gray;
      }
      transition: background-color 0.3s;
    `;
    return (
      <PlainBtn onClick={fliper}>
        <Box
          sx={{
            display: 'flex',
            height: 40,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AddCircleIcon sx={{ color: blackColor, opacity: '0.5' }} />{' '}
        </Box>
      </PlainBtn>
    );
  };

export const addProblemBarBackBuilder = (
  studyId: number,
  scheduleId: number,
  name?: string,
  link?: string,
) =>
  function Back({ fliper }: { fliper: () => void }) {
    const { getReadmeContents } = useContext(StudyDetailStore);

    const [problemName, setPropblemName] = useState<string>(name ? name : '');
    const [problemLink, setPropblemLink] = useState<string>(link ? link : '');

    const buildProblemData = () => {
      return {
        problems: [
          {
            name: problemName,
            link: problemLink,
          },
        ],
        scheduleId,
      };
    };

    const addProblem = async () => {
      //unix 시간을 비교하여 시작 > 마감의 경우 예외 처리
      if (!problemName || !problemLink) {
        generateError('문제 이름과 링크를 모두 입력해주세요', '');
        return;
      }

      const requestBody = buildProblemData();

      await postRequest(`/api/study/${studyId}/problem`, requestBody);
      setPropblemName('');
      setPropblemLink('');
      getReadmeContents(studyId);
    };

    const editProblem = async () => {
      if (name && name === problemName && link && link === problemLink) {
        generateError('변경 사항이 없습니다', '');
        return;
      }
      const requestBody = buildProblemData();

      await putRequest(`/api/study/${studyId}/problem`, requestBody);
      getReadmeContents(studyId);
    };

    return (
      <>
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
            <Box
              sx={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}
            >
              <Typography sx={{ marginRight: '10px' }}>문제 이름</Typography>
              <Input
                type="text"
                value={problemName}
                onChange={(e) => setPropblemName(e.target.value)}
              />
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}
            >
              <Typography sx={{ marginRight: '10px' }}>링크</Typography>
              <Input
                type="text"
                value={problemLink}
                style={{ width: '300px' }}
                onChange={(e) => setPropblemLink(e.target.value)}
              />
            </Box>
          </Box>
          {!name && <Button onClick={addProblem}>생성</Button>}
          {name && <Button onClick={editProblem}>수정</Button>}
        </Box>
        <Button color="error" onClick={fliper}>
          취소
        </Button>
      </>
    );
  };

const Input = styled.input`
  all: unset;
  width: 200px;
  font-size: 14px;
  font-weight: 400;
  padding: 0 5px;
  box-sizing: border-box;
  border-bottom: 1px solid ${subColor};
  background-color: ${whiteColor};
`;
