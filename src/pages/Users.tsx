import React from 'react';
import { Users as UsersIcon, UserPlus, Shield, Mail } from 'lucide-react';

const Users: React.FC = () => {
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
        <UsersIcon size={64} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}>
          User Management
        </h1>
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.125rem',
          marginBottom: '2rem'
        }}>
          Comprehensive user management system coming soon!
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
          <UserPlus size={32} style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>User Registration</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Manage user onboarding and registration
          </p>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-primary)'
        }}>
          <Shield size={32} style={{ color: 'var(--color-warning)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Roles & Permissions</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Control access and permissions
          </p>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-primary)'
        }}>
          <Mail size={32} style={{ color: 'var(--color-info)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Communication</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Send notifications and messages
          </p>
        </div>
      </div>

      <p style={{ 
        color: 'var(--text-tertiary)', 
        fontSize: '0.875rem',
        fontStyle: 'italic'
      }}>
        User management features are under development. Stay tuned!
      </p>
    </div>
  );
};

export default Users;
