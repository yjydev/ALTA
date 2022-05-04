import { useContext, useEffect } from 'react';
import { Box } from '@mui/material';

import { LoginDataStore } from '../../context/LoginDataContext';
import { getRequest } from '../../api/request';

import ALTA_UserData from './ALTA_UserData';
import ALTA_StudyList from './ALTA_StudyList';

export default function ALTA_MypageContents() {
  const { loginData, setLoginData } = useContext(LoginDataStore);

  const getUserData = async () => {
    const response = await getRequest('/api/user/info');
    console.log(response);
    setLoginData(response.data.userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <ALTA_UserData loginData={loginData} />
        <ALTA_StudyList studyList={loginData.studyList} />
      </Box>
    </>
  );
}
