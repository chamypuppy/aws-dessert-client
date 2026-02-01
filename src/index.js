import React from 'react';
import ReactDOM from 'react-dom/client';

/* css */
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';

// import App from './App';
import App from "./app/App";
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);

// reportWebVitals();
