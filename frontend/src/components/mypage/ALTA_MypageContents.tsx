import { useContext, useEffect } from 'react';
import { Box } from '@mui/material';

import { UserDataStore } from '../../context/UserDataContext';
import { getRequest } from '../../api/request';

import ALTA_UserData from './ALTA_UserData';
import ALTA_StudyList from './ALTA_StudyList';

export default function ALTA_MypageContents() {
  const { setUserData } = useContext(UserDataStore);

  const getUserData = async () => {
    const response = await getRequest('/api/user/info');
    setUserData(response.userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <ALTA_UserData />
        <ALTA_StudyList />
      </Box>
    </>
  );
}
