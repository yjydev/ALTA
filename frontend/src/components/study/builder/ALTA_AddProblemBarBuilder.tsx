import { useContext, useState } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styled from '@emotion/styled';

import { blackColor, subColor, whiteColor } from '../../../modules/colorChart';
import { generateError } from '../../../modules/generateAlert';
import { StudyDetailStore } from '../../../context/StudyDetailContext';
import { checkLogin } from '../../../modules/LoginTokenChecker';
import { useNavigate } from 'react-router-dom';
import { addProblemApi, editProblemApi } from '../../../api/apis';

import ALTA_Tooltip from '../../common/ALTA_Tooltip';

export const addProblemBarFrontBuilder = () =>
  function Front({ fliper }: { fliper: () => void }) {
    return (
      <ALTA_Tooltip title="문제 추가하기">
        <PlainBtn onClick={fliper}>
          <Box sx={addProblemBarFrontStyle}>
            <AddCircleIcon sx={addIconStyle} />
          </Box>
        </PlainBtn>
      </ALTA_Tooltip>
    );
  };

export const addProblemBarBackBuilder = (
  studyId: number,
  scheduleId: number,
  name?: string,
  link?: string,
  id?: number,
) =>
  function Back({ fliper }: { fliper: () => void }) {
    const { getStudyDetail } = useContext(StudyDetailStore);
    const navigate = useNavigate();

    const [problemId, _] = useState<number>(id ? id : -1);
    const [problemName, setPropblemName] = useState<string>(name ? name : '');
    const [problemLink, setPropblemLink] = useState<string>(link ? link : '');
    const [editProblemLoading, setEditProblemLoading] = useState<boolean>(false);

    const addProblem = async (): Promise<void> => {
      if (!(await checkLogin())) navigate('/');

      if (!problemName || !problemLink) {
        generateError('문제 이름과 링크를 모두 입력해주세요', '');
        return;
      }
      try {
        await addProblemApi(studyId, scheduleId, problemName, problemLink);
      } catch {
        generateError('문제를 추가할 수 없습니다', '');
      }

      setPropblemName('');
      setPropblemLink('');
      getStudyDetail(studyId);
    };

    const editProblem = async (): Promise<void> => {
      if (!(await checkLogin())) navigate('/');

      if (name && name === problemName && link && link === problemLink) {
        generateError('변경 사항이 없습니다', '');
        return;
      }

      setEditProblemLoading(true);
      try {
        await editProblemApi(studyId, problemId, problemName, problemLink);
        fliper();
        getStudyDetail(studyId);
      } catch (error) {
        generateError('문제를 수정할 수 없습니다', '');
      } finally {
        setEditProblemLoading(false);
      }
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
          {editProblemLoading && <LinearProgress sx={{ width: '100%', margin: '10px' }} color="secondary" />}
          {!editProblemLoading && (
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>
                <Typography sx={{ marginRight: '10px' }}>문제 이름</Typography>
                <Input type="text" value={problemName} onChange={(e) => setPropblemName(e.target.value)} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>
                <Typography sx={{ marginRight: '10px' }}>링크</Typography>
                <Input
                  type="text"
                  value={problemLink}
                  style={{ width: '300px' }}
                  onChange={(e) => setPropblemLink(e.target.value)}
                />
              </Box>
            </Box>
          )}
          {!name && <Button onClick={addProblem}>생성</Button>}
          {name && <Button onClick={editProblem}>수정</Button>}
        </Box>
        <Button color="error" onClick={fliper}>
          취소
        </Button>
      </>
    );
  };

const addIconStyle = { color: blackColor, opacity: '0.5' };
const addProblemBarFrontStyle = {
  display: 'flex',
  height: 40,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
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
