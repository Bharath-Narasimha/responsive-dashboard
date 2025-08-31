import React from 'react';
import { FileText, Download, Calendar, PieChart } from 'lucide-react';

const Reports: React.FC = () => {
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
        <FileText size={64} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}>
          Reports & Analytics
        </h1>
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.125rem',
          marginBottom: '2rem'
        }}>
          Comprehensive reporting system under development!
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
          <Download size={32} style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Export Reports</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Download reports in various formats
          </p>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-primary)'
        }}>
          <Calendar size={32} style={{ color: 'var(--color-warning)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Scheduled Reports</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Automated report generation
          </p>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-primary)'
        }}>
          <PieChart size={32} style={{ color: 'var(--color-info)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Visual Reports</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Interactive charts and graphs
          </p>
        </div>
      </div>

      <p style={{ 
        color: 'var(--text-tertiary)', 
        fontSize: '0.875rem',
        fontStyle: 'italic'
      }}>
        Advanced reporting features are in development. Coming soon!
      </p>
    </div>
  );
};

export default Reports;
