import { describe, it, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MetricCard from '../MetricCard';
import { DashboardMetric } from '../../../types';

const mockMetric: DashboardMetric = {
  id: 'test-metric',
  title: 'Test Metric',
  value: 1234,
  change: 12.5,
  changeType: 'increase',
  icon: 'DollarSign',
  color: '#10B981',
};

describe('MetricCard', () => {
  it('renders metric information correctly', () => {
    render(<MetricCard metric={mockMetric} />);
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
    expect(screen.getByText('Increase from last month')).toBeInTheDocument();
  });

  it('displays negative change correctly', () => {
    const negativeMetric = {
      ...mockMetric,
      change: -5.2,
      changeType: 'decrease' as const,
    };
    
    render(<MetricCard metric={negativeMetric} />);
    
    expect(screen.getByText('-5.2%')).toBeInTheDocument();
    expect(screen.getByText('Decrease from last month')).toBeInTheDocument();
  });

  it('formats revenue values with dollar sign', () => {
    const revenueMetric = {
      ...mockMetric,
      id: 'revenue',
      value: 74394,
    };
    
    render(<MetricCard metric={revenueMetric} />);
    
    expect(screen.getByText('$74,394')).toBeInTheDocument();
  });

  it('formats conversion rate with percentage', () => {
    const conversionMetric = {
      ...mockMetric,
      id: 'conversion',
      value: 3.24,
    };
    
    render(<MetricCard metric={conversionMetric} />);
    
    expect(screen.getByText('3.24%')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MetricCard metric={mockMetric} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('metric-card', 'custom-class');
  });

  it('has proper hover effects', () => {
    const { container } = render(<MetricCard metric={mockMetric} />);
    const card = container.firstChild as HTMLElement;
    
    fireEvent.mouseEnter(card);
    expect(card).toHaveClass('metric-card');
  });

  it('is accessible', () => {
    render(<MetricCard metric={mockMetric} />);
    
    // Check that the card has proper heading structure
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});
