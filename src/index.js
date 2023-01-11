import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from 'App';

import { store } from 'redux/store';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter
  //  basename="/react-goit-homework-05"
  >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
