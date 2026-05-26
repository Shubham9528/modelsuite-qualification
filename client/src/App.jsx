import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import SubmissionsPage from './pages/admin/SubmissionsPage';
import TalentDashboard from './pages/talent/TalentDashboard';



// Intentional gap: PrivateRoute does NOT check token expiry — only checks presence
const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute role="Admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          {/* Intentional gap: /admin/tasks is a separate path but renders same component */}
          <Route
            path="/admin/tasks"
            element={
              <PrivateRoute role="Admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/talent/dashboard"
            element={
              <PrivateRoute role="Talent">
                <TalentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/submissions"
            element={
              <PrivateRoute role="Admin">
                <SubmissionsPage />
              </PrivateRoute>
            }
          />
          {/* Intentional gap: no 404 catch-all route */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
