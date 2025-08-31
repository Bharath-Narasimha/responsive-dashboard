import { 
  User, 
  DashboardMetric, 
  ChartData, 
  ActivityItem, 
  ApiResponse 
} from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  role: 'admin',
};

// Mock dashboard metrics
const mockMetrics: DashboardMetric[] = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: 74394,
    change: 12.5,
    changeType: 'increase',
    icon: 'DollarSign',
    color: '#10B981',
  },
  {
    id: 'users',
    title: 'Active Users',
    value: 2579,
    change: -3.2,
    changeType: 'decrease',
    icon: 'Users',
    color: '#3B82F6',
  },
  {
    id: 'orders',
    title: 'Orders',
    value: 1429,
    change: 8.1,
    changeType: 'increase',
    icon: 'ShoppingBag',
    color: '#8B5CF6',
  },
  {
    id: 'conversion',
    title: 'Conversion Rate',
    value: 3.24,
    change: 2.1,
    changeType: 'increase',
    icon: 'TrendingUp',
    color: '#F59E0B',
  },
];

// Mock chart data
const generateUserActivityData = (): ChartData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    name: month,
    value: Math.floor(Math.random() * 1000) + 500,
    date: `2024-${months.indexOf(month) + 1}-01`,
  }));
};

const generateSalesData = (): ChartData[] => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }).reverse();

  return days.map(day => ({
    name: day,
    value: Math.floor(Math.random() * 5000) + 1000,
  }));
};

const generateDemographicsData = (): ChartData[] => [
  { name: 'Desktop', value: 65 },
  { name: 'Mobile', value: 25 },
  { name: 'Tablet', value: 10 },
];

// Mock activity data
const generateRecentActivity = (): ActivityItem[] => {
  const activities = [
    { title: 'New user registration', description: 'A new user has registered', type: 'info' as const },
    { title: 'Payment received', description: 'Payment of $150 received from customer', type: 'success' as const },
    { title: 'Server maintenance', description: 'Scheduled maintenance completed', type: 'warning' as const },
    { title: 'Database backup', description: 'Daily backup completed successfully', type: 'info' as const },
    { title: 'Security alert', description: 'Unusual login activity detected', type: 'error' as const },
  ];

  return activities.map((activity, index) => ({
    id: `activity-${index}`,
    title: activity.title,
    description: activity.description,
    timestamp: new Date(Date.now() - index * 3600000).toISOString(),
    type: activity.type,
    user: index % 2 === 0 ? 'System' : 'John Doe',
  }));
};

// API simulation functions
export const mockApi = {
  // User endpoints
  async getCurrentUser(): Promise<ApiResponse<User>> {
    await delay(800);
    return {
      data: mockUser,
      message: 'User retrieved successfully',
      success: true,
    };
  },

  async updateUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    await delay(600);
    const updatedUser = { ...mockUser, ...userData };
    return {
      data: updatedUser,
      message: 'User updated successfully',
      success: true,
    };
  },

  // Dashboard endpoints
  async getDashboardMetrics(): Promise<ApiResponse<DashboardMetric[]>> {
    await delay(1000);
    return {
      data: mockMetrics,
      message: 'Metrics retrieved successfully',
      success: true,
    };
  },

  async getUserActivityData(): Promise<ApiResponse<ChartData[]>> {
    await delay(800);
    return {
      data: generateUserActivityData(),
      message: 'User activity data retrieved successfully',
      success: true,
    };
  },

  async getSalesData(): Promise<ApiResponse<ChartData[]>> {
    await delay(600);
    return {
      data: generateSalesData(),
      message: 'Sales data retrieved successfully',
      success: true,
    };
  },

  async getDemographicsData(): Promise<ApiResponse<ChartData[]>> {
    await delay(500);
    return {
      data: generateDemographicsData(),
      message: 'Demographics data retrieved successfully',
      success: true,
    };
  },

  async getRecentActivity(): Promise<ApiResponse<ActivityItem[]>> {
    await delay(700);
    return {
      data: generateRecentActivity(),
      message: 'Recent activity retrieved successfully',
      success: true,
    };
  },

  // Real-time updates simulation
  async subscribeToRealTimeUpdates(callback: (data: any) => void): Promise<() => void> {
    const interval = setInterval(() => {
      // Simulate random updates
      const updateTypes = ['metric', 'activity', 'user'];
      const randomType = updateTypes[Math.floor(Math.random() * updateTypes.length)];
      
      switch (randomType) {
        case 'metric':
          callback({
            type: 'METRIC_UPDATE',
            payload: {
              id: 'users',
              value: Math.floor(Math.random() * 1000) + 2000,
              change: (Math.random() - 0.5) * 20,
            },
          });
          break;
        case 'activity':
          callback({
            type: 'NEW_ACTIVITY',
            payload: {
              id: `activity-${Date.now()}`,
              title: 'Real-time update',
              description: 'This is a real-time activity update',
              timestamp: new Date().toISOString(),
              type: 'info',
              user: 'System',
            },
          });
          break;
      }
    }, 30000); // Update every 30 seconds

    // Return cleanup function
    return () => clearInterval(interval);
  },
};
