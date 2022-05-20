import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AlertContext from './context/AlertContext';

ReactDOM.render(
  <React.StrictMode>
    <AlertContext>
      <App />
    </AlertContext>
  </React.StrictMode>,
  document.getElementById('root'),
);
