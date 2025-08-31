import React, { useEffect, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import LazyWrapper from './components/common/LazyWrapper';
import { useAppDispatch } from './store';
import { setCurrentUser } from './store/slices/userSlice';
import { mockApi } from './services/mockApi';
import './styles/globals.css';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

// Lazy load placeholder pages
const Analytics = lazy(() => import('./pages/Analytics'));
const Users = lazy(() => import('./pages/Users'));
const Orders = lazy(() => import('./pages/Orders'));
const Reports = lazy(() => import('./pages/Reports'));
const Help = lazy(() => import('./pages/Help'));

const NotFound: React.FC = () => (
  <div style={{ 
    padding: '2rem', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px'
  }}>
    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-error)' }}>404</h1>
    <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
      The page you're looking for doesn't exist.
    </p>
    <a href="/" style={{ 
      padding: '0.75rem 1.5rem',
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      borderRadius: 'var(--radius-md)',
      textDecoration: 'none',
      fontWeight: '500'
    }}>
      Go back to Dashboard
    </a>
  </div>
);

// App content component that uses hooks
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Load user data on app start
    const loadUser = async () => {
      try {
        const response = await mockApi.getCurrentUser();
        dispatch(setCurrentUser(response.data));
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };

    loadUser();
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <LazyWrapper>
              <Dashboard />
            </LazyWrapper>
          } />
          <Route path="/analytics" element={
            <LazyWrapper>
              <Analytics />
            </LazyWrapper>
          } />
          <Route path="/users" element={
            <LazyWrapper>
              <Users />
            </LazyWrapper>
          } />
          <Route path="/orders" element={
            <LazyWrapper>
              <Orders />
            </LazyWrapper>
          } />
          <Route path="/reports" element={
            <LazyWrapper>
              <Reports />
            </LazyWrapper>
          } />
          <Route path="/settings" element={
            <LazyWrapper>
              <Settings />
            </LazyWrapper>
          } />
          <Route path="/help" element={
            <LazyWrapper>
              <Help />
            </LazyWrapper>
          } />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="App">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <AppContent />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
