export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'manager';
}

export interface DashboardMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  user?: string;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisible: boolean;
    analyticsEnabled: boolean;
  };
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface SidebarItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  badge?: number;
}

export type Theme = 'light' | 'dark';

export interface AppState {
  user: User | null;
  theme: Theme;
  sidebarOpen: boolean;
  loading: boolean;
  error: string | null;
}
