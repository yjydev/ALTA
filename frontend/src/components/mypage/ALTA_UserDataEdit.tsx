import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import { useContext } from 'react';

import { UserDataStore } from '../../context/UserDataContext';

import ALTA_LanguageSelector from './ALTA_LanguageSelector';

export default function ALTA_UserDataEdit() {
  const { userData } = useContext(UserDataStore);

  return (
    <Box sx={userDataStyle}>
      <Box sx={userDataTopStyle}>
        <Box sx={prifileDataStyle}>
          <TextField
            variant="standard"
            defaultValue={userData.nickname}
            sx={nicknameEditorStyle}
          />
          <TextField
            variant="standard"
            defaultValue={userData.email}
            sx={nicknameEditorStyle}
          />
          <TextArea
            defaultValue={
              userData.introduction === null
                ? '자기소개를 작성해주세요'
                : `사용 언어 : ${userData.introduction}`
            }
          ></TextArea>
          <ALTA_LanguageSelector languageList={userData.languageList} />
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

const nicknameEditorStyle = {
  width: '60%',
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
const Input = styled.input`
  all: unset;
  border-bottom: 1px solid black;
  font-size: 16px;
  font-weight: 400;
`;
