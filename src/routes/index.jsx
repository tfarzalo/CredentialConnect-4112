import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { ProviderList } from '../components/providers/ProviderList';
import { ProviderDetails } from '../pages/ProviderDetails';
import { DocumentUpload } from '../components/documents/DocumentUpload';
import { CredentialingDashboard } from '../components/credentials/CredentialingDashboard';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/providers"
        element={
          <ProtectedRoute>
            <ProviderList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/providers/:id"
        element={
          <ProtectedRoute>
            <ProviderDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <DocumentUpload onUploadComplete={() => {}} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/credentials"
        element={
          <ProtectedRoute>
            <CredentialingDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};