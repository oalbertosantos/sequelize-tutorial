import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import Login from './components/Login';
import Layout from './components/Layout';

// Componente de rota protegida
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Verifica se o token está armazenado
  return token ? children : <Navigate to="/login" state={{ error: 'Você precisa estar autenticado para acessar esta página.' }} />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rotas protegidas */}
          <Route
            path="products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="products/new"
            element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="products/edit/:id"
            element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="categories"
            element={
              <ProtectedRoute>
                <CategoryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="categories/new"
            element={
              <ProtectedRoute>
                <CategoryForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="categories/edit/:id"
            element={
              <ProtectedRoute>
                <CategoryForm />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
