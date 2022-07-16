import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './Redux/store';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import {
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleReCaptchaProvider reCaptchaKey="6LezLe4gAAAAAKJiM7htth5IsqWZ45a5OWGaQU_P">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GoogleReCaptchaProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
