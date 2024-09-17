import { Navigate, Route, Routes } from 'react-router';
import { Suspense } from 'react';
import './App.css';

import HomePage from './pages/HomePage/HomePage';
import CataloguePage from './pages/CataloguePage/CataloguePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import Loader from './components/Loader/Loader';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="catalogue" element={<CataloguePage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
