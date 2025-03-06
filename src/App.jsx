import { HashRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Layout } from './components/layout/Layout';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;