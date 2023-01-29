import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './pages/HomePage/HomePage';
import CreateProductPage from './pages/CreateProductPage/CreateProductPage';
import EditProductPage from './pages/EditProductPage/EditProductPage';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="menu">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateProductPage />} />
              <Route path="/edit/:id" element={<EditProductPage />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
