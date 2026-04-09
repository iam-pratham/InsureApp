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
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen">
      {/* Navbar hidden on auth pages since they're full-screen */}
      {!isAuthPage && <Navbar />}

      {isAuthPage ? (
        /* Auth pages use fixed inset-0 — render WITHOUT any transform wrapper
           to avoid the "transform breaks fixed positioning" bug */
        <Routes location={location}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        /* Regular pages get the smooth page-enter fade */
        <main
          key={location.pathname}
          className="max-w-7xl mx-auto px-6 lg:px-10 py-10 page-enter"
        >
          <Routes location={location}>
            <Route path="/"         element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/purchase/:policyId" element={<ProtectedRoute><Purchase /></ProtectedRoute>} />
            <Route path="/my-policies"        element={<ProtectedRoute><MyPolicies /></ProtectedRoute>} />
            <Route path="/admin"              element={<ProtectedRoute requireAdmin><AdminPanel /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      )}
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
