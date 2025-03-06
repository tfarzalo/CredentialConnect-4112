import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { ProviderList } from '../components/providers/ProviderList';
import { ProviderDetails } from '../pages/ProviderDetails';
import { DocumentUpload } from '../components/documents/DocumentUpload';
import { CredentialingDashboard } from '../components/credentials/CredentialingDashboard';
import { Groups } from '../pages/Groups';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/providers" element={<ProviderList />} />
      <Route path="/providers/:id" element={<ProviderDetails />} />
      <Route path="/documents" element={<DocumentUpload onUploadComplete={() => {}} />} />
      <Route path="/credentials" element={<CredentialingDashboard />} />
      <Route path="/groups" element={<Groups />} />
    </Routes>
  );
};