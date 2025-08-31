import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  BarChart3,
  Settings,
  Users,
  ShoppingBag,
  FileText,
  HelpCircle,
  X,
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { setSidebarOpen } from '../../store/slices/appSlice';
import { SidebarItem } from '../../types';
import './Sidebar.css';

const sidebarItems: SidebarItem[] = [
  {
    id: 'overview',
    title: 'Overview',
    icon: 'Home',
    path: '/',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: 'BarChart3',
    path: '/analytics',
    badge: 2,
  },
  {
    id: 'users',
    title: 'Users',
    icon: 'Users',
    path: '/users',
  },
  {
    id: 'orders',
    title: 'Orders',
    icon: 'ShoppingBag',
    path: '/orders',
    badge: 5,
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: 'FileText',
    path: '/reports',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'Settings',
    path: '/settings',
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: 'HelpCircle',
    path: '/help',
  },
];

const iconMap = {
  Home,
  BarChart3,
  Settings,
  Users,
  ShoppingBag,
  FileText,
  HelpCircle,
};

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const { sidebarOpen, mobileView } = useAppSelector((state) => state.app);
  const location = useLocation();

  const handleLinkClick = () => {
    if (mobileView) {
      dispatch(setSidebarOpen(false));
    }
  };

  const handleCloseSidebar = () => {
    dispatch(setSidebarOpen(false));
  };

  const renderIcon = (iconName: string, size: number = 20) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileView && sidebarOpen && (
        <div className="sidebar-overlay" onClick={handleCloseSidebar} />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'} ${className}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <BarChart3 size={24} />
            </div>
            {sidebarOpen && (
              <span className="logo-text">Dashboard</span>
            )}
          </div>

          {mobileView && (
            <button
              className="close-button"
              onClick={handleCloseSidebar}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.id} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={handleLinkClick}
                    title={!sidebarOpen ? item.title : undefined}
                  >
                    <span className="nav-icon">
                      {renderIcon(item.icon)}
                    </span>
                    
                    {sidebarOpen && (
                      <>
                        <span className="nav-text">{item.title}</span>
                        {item.badge && (
                          <span className="nav-badge">{item.badge}</span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          {sidebarOpen ? (
            <div className="sidebar-footer-content">
              <div className="footer-text">
                <div className="app-version">v1.0.0</div>
                <div className="footer-copyright">
                  © 2024 Dashboard
                </div>
              </div>
            </div>
          ) : (
            <div className="footer-icon">
              <HelpCircle size={16} />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
