import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { LicenseInfo } from '@mui/x-license-pro';

import './App.css';

import UserDataProvider from './context/UserDataContext';
import ALTA_Login from './pages/ALTA_Login';
import ALTA_AuthPage from './pages/ALTA_AuthPage';
import ALTA_Code from './pages/ALTA_Code';
import ALTA_CodeSubmit from './pages/ALTA_CodeSubmit';
import ALTA_ToOrganize from './pages/ALTA_ToOrganize';
import ALTA_StudyDetail from './pages/ALTA_StudyDetail';
import ALTA_Member from './pages/ALTA_Member';
import ALTA_Mypage from './pages/ALTA_Mypage';
import ALTA_Error from './components/common/ALTA_Error';

function App() {
  LicenseInfo.setLicenseKey(
    '2aa4db8a29be7f642c457d8df41c7e3eT1JERVI6NDMwODIsRVhQSVJZPTE2ODMyNzgzNTcwMDAsS0VZVkVSU0lPTj0x',
  );
  return (
    <UserDataProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ALTA_Login />} />
            <Route path="/study/:studyId/:problem/code/:codeId" element={<ALTA_Code />} />
            <Route path="/code/404-not-found" element={<ALTA_Error />} />
            <Route path="/auth" element={<ALTA_AuthPage />} />
            <Route path="/study/:studyId/:problemId/:problem/:codeId/code-submit" element={<ALTA_CodeSubmit />} />
            <Route path="/organize" element={<ALTA_ToOrganize />} />
            <Route path="/study/:studyId/detail" element={<ALTA_StudyDetail />} />
            <Route path="/study/:studyId/member" element={<ALTA_Member />} />
            <Route path="/mypage" element={<ALTA_Mypage />} />
          </Routes>
        </BrowserRouter>
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
