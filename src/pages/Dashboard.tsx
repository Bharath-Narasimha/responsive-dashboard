import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import {
  setMetrics,
  setUserActivityData,
  setSalesData,
  setDemographicsData,
  setRecentActivity,
  setDashboardLoading,
} from '../store/slices/dashboardSlice';
import { mockApi } from '../services/mockApi';
import MetricCard from '../components/widgets/MetricCard';
import LineChart from '../components/widgets/LineChart';
import BarChart from '../components/widgets/BarChart';
import PieChart from '../components/widgets/PieChart';
import ActivityFeed from '../components/widgets/ActivityFeed';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    metrics, 
    chartData, 
    recentActivity, 
    loading 
  } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    const loadDashboardData = async () => {
      dispatch(setDashboardLoading(true));
      
      try {
        // Load all dashboard data in parallel
        const [
          metricsResponse,
          userActivityResponse,
          salesResponse,
          demographicsResponse,
          activityResponse,
        ] = await Promise.all([
          mockApi.getDashboardMetrics(),
          mockApi.getUserActivityData(),
          mockApi.getSalesData(),
          mockApi.getDemographicsData(),
          mockApi.getRecentActivity(),
        ]);

        // Update store with fetched data
        dispatch(setMetrics(metricsResponse.data));
        dispatch(setUserActivityData(userActivityResponse.data));
        dispatch(setSalesData(salesResponse.data));
        dispatch(setDemographicsData(demographicsResponse.data));
        dispatch(setRecentActivity(activityResponse.data));
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        // Handle error (show notification, etc.)
      } finally {
        dispatch(setDashboardLoading(false));
      }
    };

    loadDashboardData();

    // Set up real-time updates
    const cleanup = mockApi.subscribeToRealTimeUpdates((update) => {
      switch (update.type) {
        case 'METRIC_UPDATE':
          // Handle metric updates
          console.log('Metric update received:', update.payload);
          break;
        case 'NEW_ACTIVITY':
          // Handle new activity
          console.log('New activity received:', update.payload);
          break;
        default:
          break;
      }
    });

    return () => {
      cleanup.then(unsubscribe => unsubscribe());
    };
  }, [dispatch]);

  const handleMetricClick = (metricId: string) => {
    console.log('Metric clicked:', metricId);
    // Handle metric card click (e.g., navigate to detailed view)
  };

  const handleRefreshData = () => {
    // Manually refresh dashboard data
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="dashboard loading">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="loading-spinner">
            <div className="spinner" />
          </div>
        </div>
        <div className="dashboard-skeleton">
          {/* Loading skeleton */}
          <div className="metrics-skeleton">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
          <div className="charts-skeleton">
            <div className="skeleton-chart" />
            <div className="skeleton-chart" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <button className="refresh-button" onClick={handleRefreshData}>
          Refresh Data
        </button>
      </div>

      {/* Key Metrics */}
      <section className="metrics-section">
        <div className="metrics-grid">
          {metrics.map((metric) => (
            <div key={metric.id} onClick={() => handleMetricClick(metric.id)}>
              <MetricCard metric={metric} />
            </div>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-section">
        <div className="charts-grid">
          <div className="chart-item large">
            <LineChart
              data={chartData.userActivity}
              title="User Activity Over Time"
              color="#3B82F6"
              height={350}
            />
          </div>
          
          <div className="chart-item">
            <BarChart
              data={chartData.salesData}
              title="Weekly Sales Revenue"
              color="#10B981"
              height={350}
            />
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="bottom-section">
        <div className="bottom-grid">
          <div className="chart-item">
            <PieChart
              data={chartData.demographics}
              title="User Demographics"
              height={400}
            />
          </div>
          
          <div className="activity-item">
            <ActivityFeed
              activities={recentActivity}
              title="Recent Activity"
              maxItems={8}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
