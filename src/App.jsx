import { HashRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Layout } from './components/layout/Layout';
import { NotificationProvider } from './contexts/NotificationContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './App.css';

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <NotificationProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </NotificationProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;