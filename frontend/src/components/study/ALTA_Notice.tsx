import { useState, useContext } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import { StudyDetailStore } from '../../context/StudyDetailContext';
import { blackColor } from '../../modules/colorChart';
import { generateError } from '../../modules/generateAlert';
import scrollStyle from '../../modules/scrollStyle';

import ALTA_Tooltip from '../../components/common/ALTA_Tooltip';

type Params = {
  studyId: string | undefined;
};

export default function ALTA_Notice() {
  const { noticeContent, editNoticeContent } = useContext(StudyDetailStore);
  const navigate = useNavigate();
  const { studyId } = useParams();

  const [notice, setNotice] = useState<string>(noticeContent.replaceAll('<br />', '\n'));
  const [noticeEditing, setNoticeEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const edit = async (): Promise<void> => {
    if (notice === noticeContent) {
      return;
    }

    setLoading(true);
    const noticeStatus = await editNoticeContent(Number(studyId), notice.replaceAll('\n', '<br />'));
    if (noticeStatus.status === -1) navigate('/');
    else if (noticeStatus.status === -2) generateError('공지사항을 변경할 수 없습니다', '');
    else {
      setNoticeEditing(false);
    }
    setLoading(false);
  };

  return (
    <>
      <Box sx={titleStyle}>
        공지사항
        <Button sx={btnStyle} onClick={(): void => setNoticeEditing(!noticeEditing)}>
          {!noticeEditing && (
            <ALTA_Tooltip title="일정 수정하기">
              <EditIcon />
            </ALTA_Tooltip>
          )}
          {noticeEditing && (
            <ALTA_Tooltip title="저장하기">
              <SaveIcon onClick={edit} />
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
    </>
  );
}
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
