import { HashRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Layout } from './components/layout/Layout';
import { NotificationProvider } from './contexts/NotificationContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <AuthProvider>
          <NotificationProvider>
            <Layout>
              <AppRoutes />
            </Layout>
          </NotificationProvider>
        </AuthProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;