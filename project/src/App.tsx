import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CarrosCubiles from './pages/CarrosCubiles';
import InsumosQuimicos from './pages/InsumosQuimicos';
import Asistencia from './pages/Asistencia';
import Facturacion from './pages/Facturacion';
import Reportes from './pages/Reportes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="carros-cubiles" element={<CarrosCubiles />} />
            <Route path="insumos-quimicos" element={<InsumosQuimicos />} />
            <Route path="asistencia" element={<Asistencia />} />
            <Route path="facturacion" element={<Facturacion />} />
            <Route path="reportes" element={<Reportes />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;