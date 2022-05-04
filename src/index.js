import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SubContextProvider } from './context/sub-context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SubContextProvider>
        <App />
      </SubContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);