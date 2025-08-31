import React from 'react';
import { ShoppingBag, Package, Truck, CreditCard } from 'lucide-react';

const Orders: React.FC = () => {
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
        <ShoppingBag size={64} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}>
          Order Management
        </h1>
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.125rem',
          marginBottom: '2rem'
        }}>
          Complete order management system in development!
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
          <Package size={32} style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Order Processing</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Track and manage order lifecycle
          </p>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-primary)'
        }}>
          <Truck size={32} style={{ color: 'var(--color-warning)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Shipping & Delivery</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Monitor shipping and delivery status
          </p>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-primary)'
        }}>
          <CreditCard size={32} style={{ color: 'var(--color-info)', marginBottom: '0.5rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Payment Processing</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Handle payments and refunds
          </p>
        </div>
      </div>

      <p style={{ 
        color: 'var(--text-tertiary)', 
        fontSize: '0.875rem',
        fontStyle: 'italic'
      }}>
        Order management features are coming soon. Check back for updates!
      </p>
    </div>
  );
};

export default Orders;
