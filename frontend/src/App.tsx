import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import './App.css';

import ALTA_Login from './pages/ALTA_Login';
import ALTA_Signup from './pages/ALTA_Signup';
import ALTA_Code from './pages/ALTA_Code';
import ALTA_ToOrganize from './pages/ALTA_ToOrganize';

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
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ALTA_Login />} />
          <Route path="/signup" element={<ALTA_Signup />} />
          <Route path="/code" element={<ALTA_Code />} />
          <Route path="/organize" element={<ALTA_ToOrganize />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
