import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardMetric, ChartData, ActivityItem } from '../../types';

interface DashboardState {
  metrics: DashboardMetric[];
  chartData: {
    userActivity: ChartData[];
    salesData: ChartData[];
    demographics: ChartData[];
  };
  recentActivity: ActivityItem[];
  loading: boolean;
  lastUpdated: string | null;
}

const initialState: DashboardState = {
  metrics: [],
  chartData: {
    userActivity: [],
    salesData: [],
    demographics: [],
  },
  recentActivity: [],
  loading: false,
  lastUpdated: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<DashboardMetric[]>) => {
      state.metrics = action.payload;
    },
    setUserActivityData: (state, action: PayloadAction<ChartData[]>) => {
      state.chartData.userActivity = action.payload;
    },
    setSalesData: (state, action: PayloadAction<ChartData[]>) => {
      state.chartData.salesData = action.payload;
    },
    setDemographicsData: (state, action: PayloadAction<ChartData[]>) => {
      state.chartData.demographics = action.payload;
    },
    setRecentActivity: (state, action: PayloadAction<ActivityItem[]>) => {
      state.recentActivity = action.payload;
    },
    addActivityItem: (state, action: PayloadAction<ActivityItem>) => {
      state.recentActivity.unshift(action.payload);
      // Keep only the latest 10 items
      state.recentActivity = state.recentActivity.slice(0, 10);
    },
    setDashboardLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString();
    },
    refreshDashboardData: (state) => {
      state.loading = true;
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const {
  setMetrics,
  setUserActivityData,
  setSalesData,
  setDemographicsData,
  setRecentActivity,
  addActivityItem,
  setDashboardLoading,
  updateLastUpdated,
  refreshDashboardData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
