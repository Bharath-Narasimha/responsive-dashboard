import React from 'react';
import { BarChart3, TrendingUp, Calendar, Filter } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div style={{ 
      padding: '2rem',
      background: 'var(--bg-primary)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-primary)',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <BarChart3 size={64} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}>
          Analytics Dashboard
        </h1>
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.125rem',
          marginBottom: '2rem'
        }}>
          Advanced analytics and reporting features are coming soon!
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-primary)'
        }}>
          <TrendingUp size={32} style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Performance Metrics</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Track KPIs and business metrics
          </p>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-primary)'
        }}>
          <Calendar size={32} style={{ color: 'var(--color-warning)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Time Series Analysis</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Analyze trends over time
          </p>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-primary)'
        }}>
          <Filter size={32} style={{ color: 'var(--color-info)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Advanced Filtering</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Custom filters and segments
          </p>
        </div>
      </div>

      <p style={{ 
        color: 'var(--text-tertiary)', 
        fontSize: '0.875rem',
        fontStyle: 'italic'
      }}>
        This page is under construction. Check back soon for powerful analytics features!
      </p>
    </div>
  );
};

export default Analytics;
