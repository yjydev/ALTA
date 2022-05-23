import { useState, useContext, useEffect } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import _ from 'lodash';

import { StudyDetailStore } from '../../context/StudyDetailContext';
import { blackColor, subColor } from '../../modules/colorChart';
import { generateError } from '../../modules/generateAlert';
import scrollStyle from '../../modules/scrollStyle';

import ALTA_Tooltip from '../../components/common/ALTA_Tooltip';

type Params = {
  studyId: string | undefined;
};

export default function ALTA_Notice() {
  const { noticeContent, getNoticeContent, editNoticeContent } = useContext(StudyDetailStore);
  const navigate = useNavigate();
  const { studyId } = useParams<Params>();

  const [notice, setNotice] = useState<string>('');
  const [noticeEditing, setNoticeEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      if (studyId) {
        const noticeStatus = await getNoticeContent(Number(studyId));

        if (noticeStatus.status === -1) navigate('/');
        else if (noticeStatus.status === -2)
          generateError('스터디 진행 정보를 불러올 수 없습니다', noticeStatus.message);
      }
    })();
  }, []);

  useEffect(() => {
    setNotice(noticeContent ? noticeContent.replaceAll('<br />', '\n') : '');
  }, [noticeContent]);

  const edit = async (): Promise<void> => {
    if (notice !== noticeContent) {
      setLoading(true);
      const noticeApiStatus = await editNoticeContent(Number(studyId), notice.replaceAll('\n', '<br />'));

      if (noticeApiStatus.status === -1) navigate('/');
      else if (noticeApiStatus.status === -2) generateError('공지사항을 변경할 수 없습니다', noticeApiStatus.message);
      else {
        setNoticeEditing(false);
      }

      setLoading(false);
    }
  };

  return (
    <Box sx={noticeWrapper}>
      <h1>스터디 공지사항</h1>
      <Box sx={titleStyle}>
        공지사항
        <Button sx={btnStyle} onClick={_.debounce((): void => setNoticeEditing(!noticeEditing), 300)}>
          {!noticeEditing && (
            <ALTA_Tooltip title="공지사항 수정하기">
              <EditIcon />
            </ALTA_Tooltip>
          )}
          {noticeEditing && (
            <ALTA_Tooltip title="저장하기">
              <SaveIcon onClick={_.debounce(edit, 500)} />
            </ALTA_Tooltip>
          )}
        </Button>
      </Box>
      <Box sx={[noticeStyle, scrollStyle]}>
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!loading && (
          <StyledTextArea
            value={notice}
            disabled={!noticeEditing}
            onChange={(e) => {
              setNotice(e.target.value);
            }}
          />
        )}
      </Box>
    </Box>
  );
}

const noticeWrapper = {
  padding: 2,
  margin: 2,
  boxSizing: 'border-box',
  borderRadius: '5px',
  backgroundColor: subColor,
};

const titleStyle = {
  position: 'relative',
  marginBottom: '10px',
  padding: '5px 10px',
  boxSizing: 'border-box',
  borderBottom: '1px solid black',
  fontSize: '20px',
  textAlign: 'center',
};

const btnStyle = {
  'position': 'absolute',
  'right': 5,
  'top': 5,
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

const noticeStyle = {
  display: 'flex',
  minHeight: '300px',
  marginBottom: '10px',
  padding: '10px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  borderRadius: '5px',
};

const StyledTextArea = styled.textarea`
  all: unset;
  flex: 1 1 auto;
  width: 100%;
  white-space: pre-line;
  color: ${blackColor};
  ::-webkit-scrollbar {
    width: 5px;
    background-color: #d9cab3;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #6d9886;
  }
`;
