import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store';
import { setMobileView } from '../../store/slices/appSlice';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Layout.css';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { sidebarOpen, mobileView } = useAppSelector((state) => state.app);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      dispatch(setMobileView(isMobile));
    };

    // Set initial mobile state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const handleProfileClick = () => {
    // Navigate to profile page or show profile modal
    console.log('Profile clicked');
  };

  const handleSettingsClick = () => {
    // Navigate to settings page
    console.log('Settings clicked');
  };

  const handleLogoutClick = () => {
    // Handle logout
    console.log('Logout clicked');
  };

  return (
    <div className="layout">
      <Sidebar />
      
      <div className={`layout-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onLogoutClick={handleLogoutClick}
        />
        
        <main className="main-content">
          <div className="content-wrapper">
            {children || <Outlet />}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
