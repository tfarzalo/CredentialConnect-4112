import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  // Temporarily return children directly without auth check
  return children;
};