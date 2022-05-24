import { Suspense, lazy, useContext, useEffect, memo } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Box, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { LicenseInfo } from '@mui/x-license-pro';
import { EventSourcePolyfill } from 'event-source-polyfill';

import UserDataProvider from './context/UserDataContext';
import './App.css';
import { AlertDataStore } from './context/AlertContext';
import { defaultAlertData } from './types';

import ALTA_Loading from './components/common/ALTA_Loading';

const LoginPage = lazy(() => import('./pages/ALTA_Login'));
const AuthPage = lazy(() => import('./pages/ALTA_AuthPage'));
const CodePage = memo(lazy(() => import('./pages/ALTA_Code')));
const SubmitPage = memo(lazy(() => import('./pages/ALTA_CodeSubmit')));
const OrganizePage = memo(lazy(() => import('./pages/ALTA_ToOrganize')));
const DetailPage = memo(lazy(() => import('./pages/ALTA_StudyDetail')));
const MemberPage = memo(lazy(() => import('./pages/ALTA_Member')));
const MyPage = lazy(() => import('./pages/ALTA_Mypage'));
const ErrorPage = lazy(() => import('./components/common/ALTA_Error'));

function App() {
  LicenseInfo.setLicenseKey(
    '2aa4db8a29be7f642c457d8df41c7e3eT1JERVI6NDMwODIsRVhQSVJZPTE2ODMyNzgzNTcwMDAsS0VZVkVSU0lPTj0x',
  );
  const { alertData, getAlertData, setAlertData, buffer, setBuffer, listening, setListening } =
    useContext(AlertDataStore);
  let eventSource: EventSourcePolyfill;
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      if (!listening) {
        eventSource = new EventSourcePolyfill(`${process.env.REACT_APP_BASE_URL}/api/user/alert/subscribe`, {
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
    }
    return () => {
      setListening(false);
      eventSource.close();
    };
  }, []);

  window.onbeforeunload = function () {
    setListening(false);
    eventSource.close();
  };
  useEffect(() => {
    if (buffer.alertId !== 0) {
      setAlertData([...alertData, buffer]);
      setBuffer(defaultAlertData);
    }
  }, [buffer]);
  useEffect((): void => {
    (async function (): Promise<void> {
      await getAlertData();
    })();
  }, []);
  return (
    <UserDataProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense
            fallback={
              <Box sx={{ height: '100vh' }}>
                <ALTA_Loading />
              </Box>
            }
          >
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/study/:studyId/:problem/code/:codeId/:language" element={<CodePage />} />
              <Route path="/code/404-not-found" element={<ErrorPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/study/:studyId/:problemId/:problem/:codeId/code-submit/:language"
                element={<SubmitPage />}
              />
              <Route path="/organize" element={<OrganizePage />} />
              <Route path="/study/:studyId/detail" element={<DetailPage />} />
              <Route path="/study/:studyId/member" element={<MemberPage />} />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </UserDataProvider>
  );
}

export default App;

const theme = createTheme({
  palette: {
    primary: {
      main: '#6d9886',
    },

    secondary: {
      main: '#d9cab3',
    },
    error: {
      main: '#c99f9f',
    },
    text: {
      primary: '#212121',
    },
  },
  typography: {
    fontFamily: ['Spoqa Han Sans Neo', 'sans-serif'].join(','),
  },
});
