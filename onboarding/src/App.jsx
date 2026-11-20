import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthLayout from "./components/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function RequireGuest({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

export default function App() {
  const location = useLocation();

  return (
    <Routes>
      {/* Public auth routes */}
      <Route
        path="/login"
        element={
          <RequireGuest>
            <LoginPage />
          </RequireGuest>
        }
      />
      <Route
        path="/register"
        element={
          <RequireGuest>
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          </RequireGuest>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <RequireGuest>
            <AuthLayout>
              <ForgotPasswordPage />
            </AuthLayout>
          </RequireGuest>
        }
      />
      <Route
        path="/delete-account"
        element={
          <RequireAuth>
            <AuthLayout>
              <DeleteAccountPage />
            </AuthLayout>
          </RequireAuth>
        }
      />
      {/* Post-login redirect (placeholder dashboard) */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Navigate to="/" replace />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
