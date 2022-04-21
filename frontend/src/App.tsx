import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import './App.css';

import ALTALogin from './pages/ALTALogin';
import ALTASignup from './pages/ALTASignup';

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
          <Route path="/" element={<ALTALogin />} />
          <Route path="/signup" element={<ALTASignup />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
