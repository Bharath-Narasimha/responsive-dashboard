import React from 'react';
import { 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock,
  User,
  MoreVertical 
} from 'lucide-react';
import { ActivityItem } from '../../types';
import './ActivityFeed.css';

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  maxItems?: number;
  className?: string;
  showUserAvatar?: boolean;
}

const typeIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const typeColors = {
  info: 'var(--color-info)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  title = 'Recent Activity',
  maxItems = 10,
  className = '',
  showUserAvatar = true,
}) => {
  const displayedActivities = activities.slice(0, maxItems);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const handleActivityClick = (activity: ActivityItem) => {
    console.log('Activity clicked:', activity);
    // Handle activity click (e.g., show details, navigate)
  };

  const handleMoreActions = (activity: ActivityItem, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('More actions for:', activity);
    // Handle more actions (e.g., show dropdown menu)
  };

  if (displayedActivities.length === 0) {
    return (
      <div className={`activity-feed empty ${className}`}>
        <div className="activity-header">
          <h3 className="activity-title">{title}</h3>
        </div>
        <div className="activity-empty">
          <Clock size={48} className="empty-icon" />
          <p className="empty-text">No recent activity</p>
          <p className="empty-subtext">
            Activity will appear here as actions are performed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`activity-feed ${className}`}>
      <div className="activity-header">
        <h3 className="activity-title">{title}</h3>
        <span className="activity-count">
          {activities.length} {activities.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="activity-list">
        {displayedActivities.map((activity, index) => {
          const IconComponent = typeIcons[activity.type];
          const isLast = index === displayedActivities.length - 1;

          return (
            <div
              key={activity.id}
              className="activity-item"
              onClick={() => handleActivityClick(activity)}
            >
              <div className="activity-icon-container">
                <div 
                  className={`activity-icon ${activity.type}`}
                  style={{ backgroundColor: typeColors[activity.type] }}
                >
                  <IconComponent size={16} />
                </div>
                {!isLast && <div className="activity-line" />}
              </div>

              <div className="activity-content">
                <div className="activity-main">
                  <div className="activity-text">
                    <h4 className="activity-item-title">{activity.title}</h4>
                    <p className="activity-description">{activity.description}</p>
                  </div>

                  <button
                    className="activity-more"
                    onClick={(e) => handleMoreActions(activity, e)}
                    aria-label="More actions"
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>

                <div className="activity-meta">
                  <div className="activity-user">
                    {showUserAvatar && (
                      <div className="user-avatar">
                        <User size={12} />
                      </div>
                    )}
                    <span className="user-name">{activity.user || 'System'}</span>
                  </div>
                  
                  <span className="activity-time">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activities.length > maxItems && (
        <div className="activity-footer">
          <button className="view-all-button">
            View all {activities.length} activities
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
