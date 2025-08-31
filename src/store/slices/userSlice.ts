import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSettings } from '../../types';

interface UserState {
  currentUser: User | null;
  settings: UserSettings;
  isAuthenticated: boolean;
  loading: boolean;
}

const defaultSettings: UserSettings = {
  theme: 'light',
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
};

const initialState: UserState = {
  currentUser: null,
  settings: defaultSettings,
  isAuthenticated: false,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    updateUserSettings: (state, action: PayloadAction<Partial<UserSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    updateNotificationSettings: (
      state,
      action: PayloadAction<Partial<UserSettings['notifications']>>
    ) => {
      state.settings.notifications = {
        ...state.settings.notifications,
        ...action.payload,
      };
    },
    updatePrivacySettings: (
      state,
      action: PayloadAction<Partial<UserSettings['privacy']>>
    ) => {
      state.settings.privacy = {
        ...state.settings.privacy,
        ...action.payload,
      };
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.settings = defaultSettings;
    },
  },
});

export const {
  setCurrentUser,
  updateUserSettings,
  updateNotificationSettings,
  updatePrivacySettings,
  setUserLoading,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
