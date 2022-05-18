import { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Box, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { LicenseInfo } from '@mui/x-license-pro';

import UserDataProvider from './context/UserDataContext';
import './App.css';

import ALTA_Loading from './components/common/ALTA_Loading';
import ALTA_Inner from './components/common/ALTA_Inner';

const LoginPage = lazy(() => import('./pages/ALTA_Login'));
const AuthPage = lazy(() => import('./pages/ALTA_AuthPage'));
const CodePage = lazy(() => import('./pages/ALTA_Code'));
const SubmitPage = lazy(() => import('./pages/ALTA_CodeSubmit'));
const OrganizePage = lazy(() => import('./pages/ALTA_ToOrganize'));
const DetailPage = lazy(() => import('./pages/ALTA_StudyDetail'));
const MemberPage = lazy(() => import('./pages/ALTA_Member'));
const MyPage = lazy(() => import('./pages/ALTA_Mypage'));
const ErrorPage = lazy(() => import('./components/common/ALTA_Error'));

function App() {
  LicenseInfo.setLicenseKey(
    '2aa4db8a29be7f642c457d8df41c7e3eT1JERVI6NDMwODIsRVhQSVJZPTE2ODMyNzgzNTcwMDAsS0VZVkVSU0lPTj0x',
  );
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
              <Route path="/study/:studyId/:problem/code/:codeId" element={<CodePage />} />
              <Route path="/code/404-not-found" element={<ErrorPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/study/:studyId/:problemId/:problem/:codeId/code-submit" element={<SubmitPage />} />
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
