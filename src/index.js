import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'App';
import { ThemeProvider } from 'contex/ThemeContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter 
 //  basename="/react-goit-homework-05"
    >
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
