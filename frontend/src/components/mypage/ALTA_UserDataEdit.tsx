import styled from '@emotion/styled';
import { Box, Button, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postRequest } from '../../api/request';
import { UserDataStore } from '../../context/UserDataContext';
import { checkLogin } from '../../modules/LoginTokenChecker';

import ALTA_LanguageSelector from './ALTA_LanguageSelector';

export default function ALTA_UserDataEdit({
  setIsEditPage,
}: {
  setIsEditPage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { userData } = useContext(UserDataStore);
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(userData.nickname);
  const [email, setEmail] = useState(userData.email);
  const [introduction, setIntroduction] = useState(userData.introduction);
  const [languageList, setLanguageList] = useState(userData.languageList);

  const editUserData = async () => {
    if (!(await checkLogin())) navigate('/');

    const requestBody = new FormData();
    const requestData = {
      nickname,
      email,
      introduction,
      languageList,
    };
    await postRequest('/api/user/info', requestBody);
  };

  return (
    <Box sx={userDataStyle}>
      <Box sx={userDataTopStyle}>
        <Box sx={prifileDataStyle}>
          <TextField
            variant="standard"
            defaultValue={nickname}
            sx={nicknameEditorStyle}
            onChange={(e) => setNickname(e.target.value)}
          />
          <TextField
            variant="standard"
            defaultValue={email}
            sx={nicknameEditorStyle}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextArea
            defaultValue={introduction === null ? '' : `${introduction}`}
            onChange={(e) => setIntroduction(e.target.value)}
          ></TextArea>
          <ALTA_LanguageSelector setLanguageList={setLanguageList} />
        </Box>
      </Box>
      <Box sx={editButtonStyle}>
        <Button onClick={editUserData}> 수정 완료</Button>
        <Button color="error" onClick={() => setIsEditPage(false)}>
          수정 취소
        </Button>
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

const editButtonStyle = {
  float: 'right',
  marginTop: 1.5,
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
