import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Set a default user to bypass login
  const [user] = useState({ id: 1, email: 'design@thunderlightmedia.com' });
  const navigate = useNavigate();

  const login = (credentials) => {
    return true; // Always return true to bypass login
  };

  const logout = () => {
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};