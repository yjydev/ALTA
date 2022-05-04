import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { getRequest } from '../../api/request';
import { defaultUserData, UserData } from '../../types/UserDataType';
import { UserDataStore } from '../../context/UserDataContext';

import ALTA_UserData from './ALTA_UserData';
import ALTA_StudyList from './ALTA_StudyList';

export default function ALTA_MypageContents() {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const { userDataContext, setUserDataContext } = useContext(UserDataStore);

  const getUserData = async () => {
    const response = await getRequest('/api/user/info');

    localStorage.setItem('UserData', JSON.stringify(response.userData));
    setUserDataContext(response.userData);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <ALTA_UserData />
        <ALTA_StudyList studyList={userDataContext.studyList} />
      </Box>
    </>
  );
}
