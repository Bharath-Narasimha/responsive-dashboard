import React from 'react';
import { HelpCircle, MessageCircle, Book, Mail } from 'lucide-react';

const Help: React.FC = () => {
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
        <HelpCircle size={64} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}>
          Help & Support
        </h1>
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.125rem',
          marginBottom: '2rem'
        }}>
          Comprehensive help center and support system coming soon!
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
          <MessageCircle size={32} style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Live Chat</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Get instant help from our support team
          </p>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-primary)'
        }}>
          <Book size={32} style={{ color: 'var(--color-warning)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Documentation</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Browse comprehensive guides and tutorials
          </p>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-primary)'
        }}>
          <Mail size={32} style={{ color: 'var(--color-info)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Email Support</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Send us a message for detailed support
          </p>
        </div>
      </div>

      <div style={{ 
        background: 'var(--bg-secondary)', 
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-primary)',
        marginBottom: '1rem'
      }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Quick Contact</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          For immediate assistance, reach out to us:
        </p>
        <p style={{ color: 'var(--color-primary)', fontWeight: '500' }}>
          📧 support@dashboard.com<br/>
          📞 +1 (555) 123-4567
        </p>
      </div>

      <p style={{ 
        color: 'var(--text-tertiary)', 
        fontSize: '0.875rem',
        fontStyle: 'italic'
      }}>
        Full help center and support features are under construction!
      </p>
    </div>
  );
};

export default Help;
