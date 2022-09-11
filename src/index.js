import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes } from 'react-router-dom';
import GamesPage from './pages/Games/GamesPage';
import GameIdPage from './pages/Games/GameIdPage';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './pages/Errors/NotFound';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<GamesPage />} />
          <Route path="/:provider/:id" element={<GameIdPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
