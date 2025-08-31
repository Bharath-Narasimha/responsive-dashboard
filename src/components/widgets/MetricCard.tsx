import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag } from 'lucide-react';
import { DashboardMetric } from '../../types';
import './MetricCard.css';

interface MetricCardProps {
  metric: DashboardMetric;
  className?: string;
}

const iconMap = {
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
};

const MetricCard: React.FC<MetricCardProps> = ({ metric, className = '' }) => {
  const formatValue = (value: number, id: string) => {
    switch (id) {
      case 'revenue':
        return `$${value.toLocaleString()}`;
      case 'conversion':
        return `${value.toFixed(2)}%`;
      default:
        return value.toLocaleString();
    }
  };

  const formatChange = (change: number) => {
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;
  const TrendIcon = metric.changeType === 'increase' ? TrendingUp : TrendingDown;

  return (
    <div className={`metric-card ${className}`}>
      <div className="metric-header">
        <div className="metric-icon" style={{ backgroundColor: metric.color }}>
          <IconComponent size={20} />
        </div>
        <div className="metric-trend">
          <TrendIcon 
            size={16} 
            className={`trend-icon ${metric.changeType}`}
          />
          <span className={`trend-value ${metric.changeType}`}>
            {formatChange(metric.change)}
          </span>
        </div>
      </div>

      <div className="metric-content">
        <h3 className="metric-title">{metric.title}</h3>
        <div className="metric-value">
          {formatValue(metric.value, metric.id)}
        </div>
      </div>

      <div className="metric-footer">
        <span className="metric-subtitle">
          {metric.changeType === 'increase' ? 'Increase' : 'Decrease'} from last month
        </span>
      </div>
    </div>
  );
};

export default MetricCard;
