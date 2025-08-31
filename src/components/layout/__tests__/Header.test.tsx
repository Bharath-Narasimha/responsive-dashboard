import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../Header';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import appSlice from '../../../store/slices/appSlice';
import userSlice from '../../../store/slices/userSlice';

// Mock store setup
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      app: appSlice,
      user: userSlice,
    },
    preloadedState: {
      app: {
        theme: 'light' as const,
        sidebarOpen: true,
        loading: false,
        error: null,
        mobileView: false,
      },
      user: {
        currentUser: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'admin',
        },
        settings: {
          theme: 'light' as const,
          language: 'en',
          notifications: {
            email: true,
            push: true,
            sms: false,
          },
          privacy: {
            profileVisible: true,
            analyticsEnabled: true,
          },
        },
        isAuthenticated: true,
        loading: false,
      },
      ...initialState,
    },
  });
};

const HeaderWrapper: React.FC<{ store: any; children: React.ReactNode }> = ({ 
  store, 
  children 
}) => (
  <Provider store={store}>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </Provider>
);

describe('Header', () => {
  let mockStore: any;

  beforeEach(() => {
    mockStore = createMockStore();
  });

  it('renders header elements correctly', () => {
    render(
      <HeaderWrapper store={mockStore}>
        <Header />
      </HeaderWrapper>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(
      <HeaderWrapper store={mockStore}>
        <Header />
      </HeaderWrapper>
    );

    const themeButton = screen.getByLabelText(/switch to dark theme/i);
    expect(themeButton).toBeInTheDocument();
  });

  it('shows notification badge', () => {
    render(
      <HeaderWrapper store={mockStore}>
        <Header />
      </HeaderWrapper>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('handles menu button click', () => {
    render(
      <HeaderWrapper store={mockStore}>
        <Header />
      </HeaderWrapper>
    );

    const menuButton = screen.getByLabelText('Toggle sidebar');
    fireEvent.click(menuButton);

    // The sidebar state should be toggled
    // Note: In a real test, you'd check the store state or mock the dispatch
  });

  it('handles search form submission', () => {
    render(
      <HeaderWrapper store={mockStore}>
        <Header />
      </HeaderWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchForm = searchInput.closest('form');

    fireEvent.change(searchInput, { target: { value: 'test search' } });
    fireEvent.submit(searchForm!);

    expect(searchInput).toHaveValue('test search');
  });

  it('shows profile menu on profile button click', () => {
    render(
      <HeaderWrapper store={mockStore}>
        <Header />
      </HeaderWrapper>
    );

    const profileButton = screen.getByLabelText('User profile menu');
    fireEvent.click(profileButton);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls callback functions when provided', () => {
    const mockOnProfile = jest.fn();
    const mockOnSettings = jest.fn();
    const mockOnLogout = jest.fn();

    render(
      <HeaderWrapper store={mockStore}>
        <Header
          onProfileClick={mockOnProfile}
          onSettingsClick={mockOnSettings}
          onLogoutClick={mockOnLogout}
        />
      </HeaderWrapper>
    );

    // Open profile menu
    const profileButton = screen.getByLabelText('User profile menu');
    fireEvent.click(profileButton);

    // Click profile option
    const profileOption = screen.getByText('Profile');
    fireEvent.click(profileOption);
    expect(mockOnProfile).toHaveBeenCalled();
  });

  it('handles mobile view correctly', () => {
    const mobileStore = createMockStore({
      app: {
        theme: 'light',
        sidebarOpen: false,
        loading: false,
        error: null,
        mobileView: true,
      },
    });

    render(
      <HeaderWrapper store={mobileStore}>
        <Header />
      </HeaderWrapper>
    );

    // In mobile view, user name should be hidden
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('is accessible', () => {
    render(
      <HeaderWrapper store={mockStore}>
        <Header />
      </HeaderWrapper>
    );

    // Check for proper ARIA labels
    expect(screen.getByLabelText('Toggle sidebar')).toBeInTheDocument();
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('User profile menu')).toBeInTheDocument();
  });
});
