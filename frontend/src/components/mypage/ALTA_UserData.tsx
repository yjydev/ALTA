import { Box, Button, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import styled from '@emotion/styled';
import { useState } from 'react';

import { LoginData } from '../../types/LoginDataType';

import ALTA_AlertSetting from './ALTA_AlertSetting';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_UserData({ loginData }: Props) {
  const [fold, setFold] = useState(true);

  return (
    <Box sx={wrapper}>
      <ALTA_ContentsTitle>내 정보</ALTA_ContentsTitle>
      <Box sx={[userDataStyle, fold ? null : unfold]}>
        <Box sx={userDataTopStyle}>
          <Box sx={profileImgStyle}></Box>
          <Box sx={prifileDataStyle}>
            <Typography sx={nicknameStyle}>
              {loginData.nickname}
              <GitHubIcon sx={{ marginLeft: '10px' }} />
            </Typography>
            <TextArea disabled></TextArea>
            <Typography>
              사용 언어 : {loginData.languageList.join(' ')}
            </Typography>
            <Typography>활동 시간 : {loginData.time}</Typography>
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

type Props = {
  loginData: LoginData;
};

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
  marginBottom: '100px',
};

const unfold = {
  height: '650px',
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
