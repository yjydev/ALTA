import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { LoginData } from '../../types/LoginDataType';

type Props = {
  loginData: LoginData;
};

export default function ALTA_UserDataDisplay({ loginData }: Props) {
  return (
    <Box sx={userDataStyle}>
      <Box sx={userDataTopStyle}>
        <Box sx={prifileDataStyle}>
          <Typography sx={nicknameStyle}>{loginData.nickname}</Typography>
          <TextArea disabled></TextArea>
          <Typography>
            사용 언어 : {loginData.languageList.join(' ')}
          </Typography>
          <Typography>활동 시간 : {loginData.time}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

const userDataStyle = {
  position: 'relative',
  height: '200px',
  marginBottom: '100px',
  borderRadius: '10px',
  transition: '.3s',
  backgroundColor: '#fff',
  overflow: 'hidden',
};

const userDataTopStyle = {
  display: 'flex',
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
const TextArea = styled.textarea`
  all: unset;
  width: 90%;
  padding: 0 10px;
  margin: 10px 0 20px;
  border-radius: 5px;
  background-color: rgba(224, 212, 194, 0.6);
`;
