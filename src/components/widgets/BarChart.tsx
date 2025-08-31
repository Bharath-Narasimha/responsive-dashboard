import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartData } from '../../types';
import './Chart.css';

interface BarChartProps {
  data: ChartData[];
  title: string;
  dataKey?: string;
  color?: string;
  height?: number;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  dataKey = 'value',
  color = '#10B981',
  height = 300,
  className = '',
}) => {
  const formatTooltipValue = (value: any) => {
    if (typeof value === 'number') {
      return `$${value.toLocaleString()}`;
    }
    return value;
  };

  const formatAxisValue = (value: any) => {
    if (typeof value === 'number' && value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value" style={{ color: payload[0].color }}>
            {`Sales: ${formatTooltipValue(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`chart-container ${className}`}>
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: color }}
            />
            <span className="legend-text">Revenue</span>
          </div>
        </div>
      </div>
      
      <div className="chart-content" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--border-primary)"
              opacity={0.3}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fontSize: 12, 
                fill: 'var(--text-secondary)' 
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ 
                fontSize: 12, 
                fill: 'var(--text-secondary)' 
              }}
              tickFormatter={formatAxisValue}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[4, 4, 0, 0]}
              animationBegin={0}
              animationDuration={1000}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
