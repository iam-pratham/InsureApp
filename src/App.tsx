import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Purchase from './pages/Purchase';
import MyPolicies from './pages/MyPolicies';
import AdminPanel from './pages/AdminPanel';

const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* key re-mounts the wrapper on each route change → smooth fade-in */}
      <main
        key={location.pathname}
        className="max-w-7xl mx-auto px-6 lg:px-10 py-10 page-enter"
      >
        <Routes location={location}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/"         element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/purchase/:policyId" element={<ProtectedRoute><Purchase /></ProtectedRoute>} />
          <Route path="/my-policies"        element={<ProtectedRoute><MyPolicies /></ProtectedRoute>} />
          <Route path="/admin"              element={<ProtectedRoute requireAdmin><AdminPanel /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
