import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SubContextProvider } from './context/sub-context';
import { BodyContextProvider } from './context/body-context';
import ScrollToTop from './hooks/ScrollToTop';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SubContextProvider>
        <BodyContextProvider>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </BodyContextProvider>
      </SubContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);