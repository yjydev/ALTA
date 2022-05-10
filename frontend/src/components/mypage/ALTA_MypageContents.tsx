import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkLogin } from '../../modules/LoginTokenChecker';
import { getRequest } from '../../api/request';
import { UserDataStore } from '../../context/UserDataContext';

import ALTA_UserData from './ALTA_UserData';
import ALTA_StudyList from './ALTA_StudyList';
import ALTA_MyPageSkeleton from '../skeleton/ALTA_MyPageSkeleton';

export default function ALTA_MypageContents() {
  const { userData, getUserData } = useContext(UserDataStore);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      await getUserData();
      setLoading(false);
    })();
    // getUserData();
  }, []);
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {loading && <ALTA_MyPageSkeleton />}
        {!loading && <ALTA_UserData />}
        {!loading && <ALTA_StudyList studyList={userData.studyList} />}
      </Box>
    </>
  );
}
