import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes,Route,Navigate } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SearchPage from './SearchPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} >
    <Route path="/search/*" element={<SearchPage />} />
    <Route path='/' element={<Navigate to='/search' replace />} />
    </Route>
    {/* <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here and click the appropriate Url to get the Gallery App!</p>
        </main>
      }
    /> */}
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
