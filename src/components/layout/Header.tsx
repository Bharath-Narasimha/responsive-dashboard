import React from 'react';
import { Menu, Bell, Search, Sun, Moon, User, Settings, LogOut } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { toggleSidebar, setSidebarOpen } from '../../store/slices/appSlice';
import { useTheme } from '../../contexts/ThemeContext';
import './Header.css';

interface HeaderProps {
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}) => {
  const dispatch = useAppDispatch();
  const { sidebarOpen, mobileView } = useAppSelector((state) => state.app);
  const { currentUser } = useAppSelector((state) => state.user);
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleMenuClick = () => {
    if (mobileView) {
      dispatch(setSidebarOpen(!sidebarOpen));
    } else {
      dispatch(toggleSidebar());
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search:', searchQuery);
  };

  const handleProfileMenuToggle = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={handleMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        
        <div className="logo">
          <span className="logo-text">Dashboard</span>
        </div>
      </div>

      <div className="header-center">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-container">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </form>
      </div>

      <div className="header-right">
        <button
          className="icon-button theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button className="icon-button notifications" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-badge">3</span>
        </button>

        <div className="profile-menu-container">
          <button
            className="profile-button"
            onClick={handleProfileMenuToggle}
            aria-label="User profile menu"
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                <User size={16} />
              </div>
            )}
            <span className="profile-name">{currentUser?.name || 'User'}</span>
          </button>

          {showProfileMenu && (
            <div className="profile-menu">
              <div className="profile-menu-header">
                <div className="profile-info">
                  <div className="profile-name">{currentUser?.name}</div>
                  <div className="profile-email">{currentUser?.email}</div>
                </div>
              </div>
              
              <div className="profile-menu-divider" />
              
              <button
                className="profile-menu-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  onProfileClick?.();
                }}
              >
                <User size={16} />
                <span>Profile</span>
              </button>
              
              <button
                className="profile-menu-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  onSettingsClick?.();
                }}
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>
              
              <div className="profile-menu-divider" />
              
              <button
                className="profile-menu-item logout"
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogoutClick?.();
                }}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
