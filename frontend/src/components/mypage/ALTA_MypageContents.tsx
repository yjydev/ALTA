import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { getRequest } from '../../api/request';
import { UserDataStore } from '../../context/UserDataContext';

import ALTA_UserData from './ALTA_UserData';
import ALTA_StudyList from './ALTA_StudyList';
import ALTA_MyPageSkeleton from '../skeleton/ALTA_MyPageSkeleton';

export default function ALTA_MypageContents() {
  const { userDataContext, setUserDataContext } = useContext(UserDataStore);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    const response = await getRequest('/api/user/info');

    localStorage.setItem('UserData', JSON.stringify(response.userData));
    setUserDataContext(response.userData);
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {loading && <ALTA_MyPageSkeleton />}
        {!loading && <ALTA_UserData />}
        {!loading && <ALTA_StudyList studyList={userDataContext.studyList} />}
      </Box>
    </>
  );
}
