import styled from '@emotion/styled';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { editUserDataApi } from '../../api/apis';
import { UserDataStore } from '../../context/UserDataContext';
import { generateError } from '../../modules/generateAlert';
import { checkLogin } from '../../modules/LoginTokenChecker';

import ALTA_LanguageSelector from './ALTA_LanguageSelector';

export default function ALTA_UserDataEdit({
  setIsEditPage,
}: {
  setIsEditPage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { userData, editUserData } = useContext(UserDataStore);
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(userData.nickname);
  const [email, setEmail] = useState(userData.email);
  const [introduction, setIntroduction] = useState(userData.introduction);
  const [languageList, setLanguageList] = useState(userData.languageList);
  const [editUserDataLoading, setEditUserDataLoading] =
    useState<boolean>(false);

  const edit = async () => {
    if (!(await checkLogin())) navigate('/');

    if (
      nickname === userData.nickname &&
      email === userData.email &&
      introduction === userData.introduction &&
      languageList === userData.languageList
    ) {
      generateError('변경 사항이 없습니다', '');
    } else if (!nickname || !email || !introduction || !languageList) {
      generateError('모든 항목을 채워주세요', '');
    } else {
      setEditUserDataLoading(true);
      const userStatus = await editUserData(
        nickname,
        email,
        introduction,
        languageList,
      );

      if (userStatus.status === -1) navigate('/');
      else if (userStatus.status === -2)
        generateError('유저 정보를 수정할 수 없습니다', '');
      else setEditUserDataLoading(false);
    }
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
          <ALTA_LanguageSelector
            languageList={languageList}
            setLanguageList={setLanguageList}
          />
        </Box>
      </Box>
      <Box sx={editButtonStyle}>
        <Button onClick={edit}>
          {editUserDataLoading ? <CircularProgress size={20} /> : '수정 완료'}
        </Button>
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
