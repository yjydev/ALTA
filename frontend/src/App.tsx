import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import './App.css';

import LoginDataProvider from './context/LoginDataContext';
import ALTA_Login from './pages/ALTA_Login';
import ALTA_AuthPage from './pages/ALTA_AuthPage';
import ALTA_Code from './pages/ALTA_Code';
import ALTA_CodeSubmit from './pages/ALTA_CodeSubmit';
import ALTA_ToOrganize from './pages/ALTA_ToOrganize';
import ALTA_StudyDetail from './pages/ALTA_StudyDetail';
import ALTA_Member from './pages/ALTA_Member';
import ALTA_Mypage from './pages/ALTA_Mypage';

function App() {
  return (
    <LoginDataProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ALTA_Login />} />
            <Route
              path="/study/:studyId/code/:codeId"
              element={<ALTA_Code />}
            />
            <Route path="/auth" element={<ALTA_AuthPage />} />
            <Route path="/code-submit" element={<ALTA_CodeSubmit />} />
            <Route path="/organize" element={<ALTA_ToOrganize />} />
            <Route path="/study/detail" element={<ALTA_StudyDetail />} />
            <Route path="/study/:studyId/member" element={<ALTA_Member />} />
            <Route path="/mypage" element={<ALTA_Mypage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LoginDataProvider>
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
