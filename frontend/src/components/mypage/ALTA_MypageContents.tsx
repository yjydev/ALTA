import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventSourcePolyfill } from 'event-source-polyfill';

import { generateError } from '../../modules/generateAlert';
import { UserDataStore } from '../../context/UserDataContext';
import { AlertDataStore } from '../../context/AlertContext';

import ALTA_UserData from './ALTA_UserData';
import ALTA_StudyList from './ALTA_StudyList';
import ALTA_Loading from '../common/ALTA_Loading';

export default function ALTA_MypageContents() {
  const { userData, getUserData } = useContext(UserDataStore);
  const navigate = useNavigate();
  const { getAlertData, setBuffer, setListening, listening } = useContext(AlertDataStore);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const UserStatus = await getUserData();

      if (UserStatus.status === -1) navigate('/');
      else if (UserStatus.status === -2) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('refresh');
        localStorage.removeItem('userData');
        generateError('유저 정보를 불러올 수 없습니다', UserStatus.message, () => navigate('/'));
      } else setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!listening) {
      (async function (): Promise<void> {
        await getAlertData();
      })();
      const eventSource = new EventSourcePolyfill(`${process.env.REACT_APP_BASE_URL}/api/user/alert/subscribe`, {
        heartbeatTimeout: 70 * 1000,
        headers: {
          ACCESS_TOKEN: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      eventSource.addEventListener('message', function (event) {
        const result = event.data;
        if (JSON.parse(result)['alertId'] !== -1) {
          const d = JSON.parse(result);
          setBuffer(d);
        }
      });
      setListening(true);
    }
  }, []);

  return (
    <>
      {loading && <ALTA_Loading />}
      <h1>마이 페이지</h1>
      <Box sx={{ position: 'relative' }}>
        <h2>내 정보</h2>
        {!loading && <ALTA_UserData />}
        <h2>스터디 관리</h2>
        {!loading && <ALTA_StudyList studyList={userData.studyList} />}
      </Box>
    </>
  );
}
