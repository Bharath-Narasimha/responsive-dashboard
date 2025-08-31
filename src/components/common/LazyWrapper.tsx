import React, { Suspense } from 'react';
import './LazyWrapper.css';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const DefaultFallback: React.FC = () => (
  <div className="lazy-loading">
    <div className="loading-container">
      <div className="spinner" />
      <p className="loading-text">Loading...</p>
    </div>
  </div>
);

const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback = <DefaultFallback />,
  className = '',
}) => {
  return (
    <Suspense fallback={fallback}>
      <div className={`lazy-wrapper ${className}`}>
        {children}
      </div>
    </Suspense>
  );
};

export default LazyWrapper;
