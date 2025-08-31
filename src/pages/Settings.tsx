import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Save, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Moon,
  Sun,
  Check,
  X
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store';
import { updateUserSettings, updateNotificationSettings, updatePrivacySettings } from '../store/slices/userSlice';
import { useTheme } from '../contexts/ThemeContext';
// import { UserSettings } from '../types';
import './Settings.css';

// Validation schema
const settingsSchema = yup.object({
  profile: yup.object({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    language: yup.string().required('Language is required'),
  }).required(),
  notifications: yup.object({
    email: yup.boolean().required(),
    push: yup.boolean().required(),
    sms: yup.boolean().required(),
  }).required(),
  privacy: yup.object({
    profileVisible: yup.boolean().required(),
    analyticsEnabled: yup.boolean().required(),
  }).required(),
});

type SettingsFormData = {
  profile: {
    name: string;
    email: string;
    language: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisible: boolean;
    analyticsEnabled: boolean;
  };
};

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser, settings } = useAppSelector((state) => state.user);
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    // watch,
  } = useForm<SettingsFormData>({
    resolver: yupResolver(settingsSchema),
    mode: 'onBlur',
    defaultValues: {
      profile: {
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        language: settings.language || 'en',
      },
      notifications: {
        email: settings.notifications.email || false,
        push: settings.notifications.push || false,
        sms: settings.notifications.sms || false,
      },
      privacy: {
        profileVisible: settings.privacy.profileVisible || false,
        analyticsEnabled: settings.privacy.analyticsEnabled || false,
      },
    },
  });

  // const watchedNotifications = watch('notifications');
  // const watchedPrivacy = watch('privacy');

  const onSubmit = async (data: SettingsFormData) => {
    setSaveStatus('saving');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user settings in store
      dispatch(updateUserSettings({
        language: data.profile.language,
      }));
      
      dispatch(updateNotificationSettings(data.notifications));
      dispatch(updatePrivacySettings(data.privacy));
      
      setSaveStatus('saved');
      
      // Reset form dirty state
      reset(data);
      
      // Clear saved status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleDiscardChanges = () => {
    reset();
    setSaveStatus('idle');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
  ];

  const renderSaveStatus = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <div className="save-status saving">
            <div className="spinner" />
            <span>Saving...</span>
          </div>
        );
      case 'saved':
        return (
          <div className="save-status saved">
            <Check size={16} />
            <span>Settings saved successfully!</span>
          </div>
        );
      case 'error':
        return (
          <div className="save-status error">
            <X size={16} />
            <span>Failed to save settings. Please try again.</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`nav-item ${activeTab === id ? 'active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="settings-main">
          <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
            {activeTab === 'profile' && (
              <div className="settings-section">
                <h2 className="section-title">Profile Information</h2>
                <p className="section-description">
                  Update your personal information and account details.
                </p>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`form-input ${errors.profile?.name ? 'error' : ''}`}
                    {...register('profile.name')}
                  />
                  {errors.profile?.name && (
                    <span className="error-message">{errors.profile.name.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${errors.profile?.email ? 'error' : ''}`}
                    {...register('profile.email')}
                  />
                  {errors.profile?.email && (
                    <span className="error-message">{errors.profile.email.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="language" className="form-label">
                    <Globe size={16} />
                    Preferred Language
                  </label>
                  <select
                    id="language"
                    className={`form-select ${errors.profile?.language ? 'error' : ''}`}
                    {...register('profile.language')}
                  >
                    {languages.map(({ code, name }) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                  {errors.profile?.language && (
                    <span className="error-message">{errors.profile.language.message}</span>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2 className="section-title">Notification Preferences</h2>
                <p className="section-description">
                  Choose how you want to receive notifications and updates.
                </p>

                <div className="form-group">
                  <div className="toggle-group">
                    <div className="toggle-item">
                      <div className="toggle-content">
                        <label htmlFor="email-notifications" className="toggle-label">
                          Email Notifications
                        </label>
                        <p className="toggle-description">
                          Receive notifications via email about important updates.
                        </p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          id="email-notifications"
                          type="checkbox"
                          {...register('notifications.email')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="toggle-item">
                      <div className="toggle-content">
                        <label htmlFor="push-notifications" className="toggle-label">
                          Push Notifications
                        </label>
                        <p className="toggle-description">
                          Get real-time push notifications on your device.
                        </p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          id="push-notifications"
                          type="checkbox"
                          {...register('notifications.push')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="toggle-item">
                      <div className="toggle-content">
                        <label htmlFor="sms-notifications" className="toggle-label">
                          SMS Notifications
                        </label>
                        <p className="toggle-description">
                          Receive important alerts via text message.
                        </p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          id="sms-notifications"
                          type="checkbox"
                          {...register('notifications.sms')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="settings-section">
                <h2 className="section-title">Privacy & Security</h2>
                <p className="section-description">
                  Control your privacy settings and data usage preferences.
                </p>

                <div className="form-group">
                  <div className="toggle-group">
                    <div className="toggle-item">
                      <div className="toggle-content">
                        <label htmlFor="profile-visible" className="toggle-label">
                          Public Profile
                        </label>
                        <p className="toggle-description">
                          Make your profile visible to other users.
                        </p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          id="profile-visible"
                          type="checkbox"
                          {...register('privacy.profileVisible')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="toggle-item">
                      <div className="toggle-content">
                        <label htmlFor="analytics-enabled" className="toggle-label">
                          Analytics & Performance
                        </label>
                        <p className="toggle-description">
                          Help improve the service by sharing usage analytics.
                        </p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          id="analytics-enabled"
                          type="checkbox"
                          {...register('privacy.analyticsEnabled')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="settings-section">
                <h2 className="section-title">Appearance</h2>
                <p className="section-description">
                  Customize the look and feel of your dashboard.
                </p>

                <div className="form-group">
                  <label className="form-label">Theme Preference</label>
                  <div className="theme-options">
                    <button
                      type="button"
                      className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => theme !== 'light' && toggleTheme()}
                    >
                      <Sun size={20} />
                      <span>Light Theme</span>
                    </button>
                    <button
                      type="button"
                      className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => theme !== 'dark' && toggleTheme()}
                    >
                      <Moon size={20} />
                      <span>Dark Theme</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Actions */}
            {activeTab !== 'appearance' && (
              <div className="settings-actions">
                {isDirty && (
                  <div className="actions-left">
                    <button
                      type="button"
                      className="discard-button"
                      onClick={handleDiscardChanges}
                      disabled={saveStatus === 'saving'}
                    >
                      Discard Changes
                    </button>
                  </div>
                )}
                
                <div className="actions-right">
                  {renderSaveStatus()}
                  <button
                    type="submit"
                    className="save-button"
                    disabled={!isDirty || saveStatus === 'saving'}
                  >
                    <Save size={16} />
                    {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
