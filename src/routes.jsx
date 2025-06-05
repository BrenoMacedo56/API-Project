import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import CollaboratorLayout from './layouts/CollaboratorLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';

// Collaborator Pages
import CollaboratorDashboard from './pages/collaborator/Dashboard';

// Common Pages
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import TransactionList from './pages/transactions/List';
import CreateTransaction from './pages/transactions/Create';
import EditTransaction from './pages/transactions/Edit';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<Login />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<Register />}>
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <PrivateRoute requiredRole="admin">
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path='/terms' >

        </Route>

        {/* Collaborator Routes */}
        <Route path="/" element={
          <PrivateRoute>
            <CollaboratorLayout />
          </PrivateRoute>
        }>
          <Route index element={<CollaboratorDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="transactions" element={<TransactionList />} />
          <Route path="transactions/create" element={<CreateTransaction />} />
          <Route path="transactions/edit/:id" element={<EditTransaction />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
