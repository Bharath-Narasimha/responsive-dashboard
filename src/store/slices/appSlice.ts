import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '../../types';

interface AppState {
  theme: Theme;
  sidebarOpen: boolean;
  loading: boolean;
  error: string | null;
  mobileView: boolean;
}

const initialState: AppState = {
  theme: (localStorage.getItem('theme') as Theme) || 'light',
  sidebarOpen: true,
  loading: false,
  error: null,
  mobileView: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setMobileView: (state, action: PayloadAction<boolean>) => {
      state.mobileView = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setLoading,
  setError,
  setMobileView,
  clearError,
} = appSlice.actions;

export default appSlice.reducer;
