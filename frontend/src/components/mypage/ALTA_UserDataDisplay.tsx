import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useContext } from 'react';

import { UserDataStore } from '../../context/UserDataContext';

export default function ALTA_UserDataDisplay() {
  const { userDataContext } = useContext(UserDataStore);

  return (
    <Box sx={userDataStyle}>
      <Box sx={userDataTopStyle}>
        <Box sx={prifileDataStyle}>
          <Typography sx={nicknameStyle}>
            {userDataContext.nickname}
            <br />
            <Span>{userDataContext.email}</Span>
          </Typography>
          <TextArea
            disabled
            defaultValue={
              userDataContext.introduction === null
                ? '자기소개를 작성해주세요'
                : `사용 언어 : ${userDataContext.introduction}`
            }
          ></TextArea>
          <Typography>
            {userDataContext.languageList === null
              ? '사용 언어를 설정해주세요'
              : `사용 언어 : ${userDataContext.languageList}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

const userDataStyle = {
  position: 'relative',
  height: '300px',
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
const Span = styled.span`
  font-size: 16px;
  font-weight: 400;
`;
