import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GitHubIcon from '@mui/icons-material/GitHub';
import SaveIcon from '@mui/icons-material/Save';
import styled from '@emotion/styled';
import { useState } from 'react';

import ALTA_AlertSetting from './ALTA_AlertSetting';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_UserData() {
  const languages = ['JAVA', 'Python'];

  const [fold, setFold] = useState(true);

  const time = '새벽';
  return (
    <Box sx={wrapper}>
      <ALTA_ContentsTitle>내 정보</ALTA_ContentsTitle>
      <Box sx={[userDataStyle, fold ? '' : unfold]}>
        <Box sx={userDataTopStyle}>
          <Box sx={profileImgStyle}></Box>
          <Box sx={prifileDataStyle}>
            <Typography sx={nicknameStyle}>
              닉네임
              <GitHubIcon sx={{ marginLeft: '10px' }} />
            </Typography>
            <TextArea disabled></TextArea>
            <Typography>사용 언어 : {languages.join(' ')}</Typography>
            <Typography>활동 시간 : {time}</Typography>
          </Box>
        </Box>
        <Box>
          <ALTA_AlertSetting />
        </Box>
        <Button sx={editButtonStyle} onClick={() => setFold(!fold)}>
          {fold ? '알림 설정' : '설정 완료'}
        </Button>
      </Box>
    </Box>
  );
}

const wrapper = {
  position: 'absolute',
  minWidth: '100%',
  top: '20px',
  zIndex: 100,
};

const userDataStyle = {
  position: 'relative',
  height: '200px',
  marginBottom: '100px',
  padding: '40px 20px',
  borderRadius: '10px',
  transition: '.3s',
  backgroundColor: '#fff',
  overflow: 'hidden',
};

const userDataTopStyle = {
  display: 'flex',
};

const unfold = {
  height: '600px',
};

const profileImgStyle = {
  width: '200px',
  height: '200px',
  borderRadius: '100px',
  backgroundColor: 'black',
};

const prifileDataStyle = {
  marginLeft: '50px',
  flex: '1 1 auto',
};

const nicknameStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  fontSize: '20px',
  fontWeight: 'bold',
};

const editButtonStyle = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
};

const TextArea = styled.textarea`
  all: unset;
  width: 80%;
  margin-bottom: 20px;
  background-color: orange;
`;
