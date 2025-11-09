import React, { useState, useEffect } from 'react';
import { FiUser, FiBell, FiDatabase, FiShield, FiMonitor, FiSave, FiRefreshCw, FiDownload, FiUpload, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';
import './SettingsPage.css';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Smith',
      email: 'john.smith@university.edu',
      department: 'Facilities Management',
      role: 'Energy Manager',
      phone: '+1 (555) 123-4567'
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      weeklyReports: true,
      monthlyReports: true,
      thresholdAlerts: true,
      maintenanceReminders: true,
      alertThreshold: 85
    },
    system: {
      autoRefresh: true,
      refreshInterval: 30,
      dataRetention: 365,
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      theme: 'light',
      language: 'en'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 60,
      passwordExpiry: 90,
      loginAttempts: 5
    }
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const settingSections = [
    { id: 'profile', name: 'Profile', icon: FiUser },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'system', name: 'System', icon: FiMonitor },
    { id: 'data', name: 'Data Management', icon: FiDatabase },
    { id: 'security', name: 'Security', icon: FiShield }
  ];

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    setUnsavedChanges(false);
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    alert('Exporting data...');
  };

  const handleImportData = () => {
    alert('Import data functionality would open file picker');
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="header-info">
          <h2>Settings</h2>
          <p>Manage your account, preferences, and system configuration</p>
        </div>
        {unsavedChanges && (
          <button className="save-changes-btn" onClick={handleSaveSettings}>
            <FiSave size={16} />
            Save Changes
          </button>
        )}
      </div>

      <div className="settings-container">
        {/* Settings Sidebar */}
        <div className="settings-sidebar">
          {settingSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.id}
                className={`setting-section-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <IconComponent size={20} />
                <span>{section.name}</span>
              </div>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {activeSection === 'profile' && (
            <ProfileSettings 
              settings={settings.profile} 
              onChange={(key, value) => handleSettingChange('profile', key, value)}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
          
          {activeSection === 'notifications' && (
            <NotificationSettings 
              settings={settings.notifications} 
              onChange={(key, value) => handleSettingChange('notifications', key, value)}
            />
          )}
          
          {activeSection === 'system' && (
            <SystemSettings 
              settings={settings.system} 
              onChange={(key, value) => handleSettingChange('system', key, value)}
            />
          )}
          
          {activeSection === 'data' && (
            <DataManagementSettings 
              onExport={handleExportData}
              onImport={handleImportData}
            />
          )}
          
          {activeSection === 'security' && (
            <SecuritySettings 
              settings={settings.security} 
              onChange={(key, value) => handleSettingChange('security', key, value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Profile Settings Component
const ProfileSettings = ({ settings, onChange, showPassword, setShowPassword }) => {
  return (
    <div className="setting-panel">
      <div className="panel-header">
        <h3>Profile Information</h3>
        <p>Update your personal information and account details</p>
      </div>
      
      <div className="profile-section">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {settings.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <button className="change-avatar-btn">Change Photo</button>
        </div>
        
        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => onChange('name', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => onChange('email', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <select
                value={settings.department}
                onChange={(e) => onChange('department', e.target.value)}
                className="form-select"
              >
                <option value="Facilities Management">Facilities Management</option>
                <option value="IT Department">IT Department</option>
                <option value="Administration">Administration</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                value={settings.role}
                onChange={(e) => onChange('role', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="password-section">
        <h4>Change Password</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Current Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                className="form-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              className="form-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Notification Settings Component
const NotificationSettings = ({ settings, onChange }) => {
  return (
    <div className="setting-panel">
      <div className="panel-header">
        <h3>Notification Preferences</h3>
        <p>Configure how and when you receive notifications</p>
      </div>
      
      <div className="notification-section">
        <h4>Delivery Methods</h4>
        <div className="setting-group">
          <ToggleSetting
            label="Email Alerts"
            description="Receive alerts via email"
            checked={settings.emailAlerts}
            onChange={(checked) => onChange('emailAlerts', checked)}
          />
          <ToggleSetting
            label="SMS Alerts"
            description="Receive critical alerts via SMS"
            checked={settings.smsAlerts}
            onChange={(checked) => onChange('smsAlerts', checked)}
          />
          <ToggleSetting
            label="Push Notifications"
            description="Browser push notifications"
            checked={settings.pushNotifications}
            onChange={(checked) => onChange('pushNotifications', checked)}
          />
        </div>
      </div>
      
      <div className="notification-section">
        <h4>Report Schedule</h4>
        <div className="setting-group">
          <ToggleSetting
            label="Weekly Reports"
            description="Receive weekly energy summary reports"
            checked={settings.weeklyReports}
            onChange={(checked) => onChange('weeklyReports', checked)}
          />
          <ToggleSetting
            label="Monthly Reports"
            description="Receive detailed monthly analytics"
            checked={settings.monthlyReports}
            onChange={(checked) => onChange('monthlyReports', checked)}
          />
        </div>
      </div>
      
      <div className="notification-section">
        <h4>Alert Types</h4>
        <div className="setting-group">
          <ToggleSetting
            label="Threshold Alerts"
            description="Alert when consumption exceeds thresholds"
            checked={settings.thresholdAlerts}
            onChange={(checked) => onChange('thresholdAlerts', checked)}
          />
          <ToggleSetting
            label="Maintenance Reminders"
            description="Equipment maintenance notifications"
            checked={settings.maintenanceReminders}
            onChange={(checked) => onChange('maintenanceReminders', checked)}
          />
          
          <div className="threshold-setting">
            <label>Alert Threshold (%)</label>
            <div className="threshold-input">
              <input
                type="range"
                min="50"
                max="100"
                value={settings.alertThreshold}
                onChange={(e) => onChange('alertThreshold', parseInt(e.target.value))}
                className="threshold-slider"
              />
              <span className="threshold-value">{settings.alertThreshold}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// System Settings Component
const SystemSettings = ({ settings, onChange }) => {
  return (
    <div className="setting-panel">
      <div className="panel-header">
        <h3>System Configuration</h3>
        <p>Configure system behavior and display preferences</p>
      </div>
      
      <div className="system-section">
        <h4>Display & Interface</h4>
        <div className="setting-group">
          <div className="form-group">
            <label>Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => onChange('theme', e.target.value)}
              className="form-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Language</label>
            <select
              value={settings.language}
              onChange={(e) => onChange('language', e.target.value)}
              className="form-select"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="system-section">
        <h4>Data & Updates</h4>
        <div className="setting-group">
          <ToggleSetting
            label="Auto Refresh"
            description="Automatically refresh data"
            checked={settings.autoRefresh}
            onChange={(checked) => onChange('autoRefresh', checked)}
          />
          
          <div className="form-group">
            <label>Refresh Interval (seconds)</label>
            <select
              value={settings.refreshInterval}
              onChange={(e) => onChange('refreshInterval', parseInt(e.target.value))}
              className="form-select"
              disabled={!settings.autoRefresh}
            >
              <option value={15}>15 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
              <option value={300}>5 minutes</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Data Retention (days)</label>
            <select
              value={settings.dataRetention}
              onChange={(e) => onChange('dataRetention', parseInt(e.target.value))}
              className="form-select"
            >
              <option value={90}>90 days</option>
              <option value={180}>6 months</option>
              <option value={365}>1 year</option>
              <option value={730}>2 years</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="system-section">
        <h4>Regional Settings</h4>
        <div className="setting-group">
          <div className="form-group">
            <label>Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => onChange('timezone', e.target.value)}
              className="form-select"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Date Format</label>
            <select
              value={settings.dateFormat}
              onChange={(e) => onChange('dateFormat', e.target.value)}
              className="form-select"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Data Management Settings Component
const DataManagementSettings = ({ onExport, onImport }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [dataStatus, setDataStatus] = useState(null);

  const checkDataStatus = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/data-status');
      const data = await response.json();
      setDataStatus(data);
    } catch (error) {
      console.error('Error checking data status:', error);
    }
  };

  const initializeTestData = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:8081/api/initialize-test-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        checkDataStatus(); // Refresh data status
      } else {
        setMessage(result.message);
        setMessageType('warning');
      }
    } catch (error) {
      setMessage('Error connecting to server. Make sure the backend is running on port 8081.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const resetAndInitialize = async () => {
    if (!window.confirm('This will delete all existing data and reload sample data. Are you sure?')) {
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:8081/api/reset-and-initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        checkDataStatus(); // Refresh data status
      } else {
        setMessage(result.message);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error connecting to server. Make sure the backend is running on port 8081.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Check data status on component mount
  useEffect(() => {
    checkDataStatus();
  }, []);

  return (
    <div className="setting-panel">
      <div className="panel-header">
        <h3>Data Management</h3>
        <p>Manage your data, backups, and system maintenance</p>
      </div>

      <div className="data-section">
        <h4>Test Data Management</h4>
        {dataStatus && (
          <div className="data-status-info">
            <div className="status-grid-small">
              <div className="status-item-small">
                <span>Departments: <strong>{dataStatus.departments}</strong></span>
              </div>
              <div className="status-item-small">
                <span>Energy Data: <strong>{dataStatus.energyData}</strong></span>
              </div>
              <div className="status-item-small">
                <span>AI Suggestions: <strong>{dataStatus.aiSuggestions}</strong></span>
              </div>
            </div>
          </div>
        )}
        
        <div className="test-data-actions">
          <button 
            className={`action-btn primary ${loading ? 'loading' : ''}`}
            onClick={initializeTestData}
            disabled={loading}
          >
            {loading ? <FiRefreshCw className="spinning" size={16} /> : <FiDatabase size={16} />}
            Initialize Test Data
          </button>

          <button 
            className={`action-btn warning ${loading ? 'loading' : ''}`}
            onClick={resetAndInitialize}
            disabled={loading}
          >
            {loading ? <FiRefreshCw className="spinning" size={16} /> : <FiRefreshCw size={16} />}
            Reset & Reload Data
          </button>

          <button 
            className="action-btn secondary"
            onClick={checkDataStatus}
            disabled={loading}
          >
            <FiRefreshCw size={16} />
            Refresh Status
          </button>
        </div>

        {message && (
          <div className={`status-message ${messageType}`}>
            {message}
          </div>
        )}
        
        <div className="test-data-info">
          <h5>Sample Data Includes:</h5>
          <ul>
            <li>5 Departments (CSE, VLSI Lab, Admin Office, Library, Cafeteria)</li>
            <li>12 Energy readings with consumption data</li>
            <li>6 AI suggestions for energy optimization</li>
          </ul>
        </div>
      </div>
      
      <div className="data-section">
        <h4>Data Export & Import</h4>
        <div className="data-actions">
          <div className="data-action-card">
            <div className="action-icon">
              <FiDownload size={24} />
            </div>
            <div className="action-content">
              <h5>Export Data</h5>
              <p>Download your energy data in CSV or JSON format</p>
              <button className="action-btn primary" onClick={onExport}>
                Export Data
              </button>
            </div>
          </div>
          
          <div className="data-action-card">
            <div className="action-icon">
              <FiUpload size={24} />
            </div>
            <div className="action-content">
              <h5>Import Data</h5>
              <p>Upload historical data or configuration files</p>
              <button className="action-btn secondary" onClick={onImport}>
                Import Data
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="data-section">
        <h4>System Maintenance</h4>
        <div className="maintenance-actions">
          <div className="maintenance-item">
            <div className="maintenance-info">
              <h5>Database Cleanup</h5>
              <p>Remove old logs and optimize database performance</p>
            </div>
            <button className="action-btn secondary">
              <FiRefreshCw size={16} />
              Run Cleanup
            </button>
          </div>
          
          <div className="maintenance-item">
            <div className="maintenance-info">
              <h5>Cache Clear</h5>
              <p>Clear application cache and temporary files</p>
            </div>
            <button className="action-btn secondary">
              <FiTrash2 size={16} />
              Clear Cache
            </button>
          </div>
        </div>
      </div>
      
      <div className="data-section">
        <h4>Storage Information</h4>
        <div className="storage-info">
          <div className="storage-item">
            <span className="storage-label">Total Storage Used</span>
            <span className="storage-value">2.4 GB</span>
          </div>
          <div className="storage-item">
            <span className="storage-label">Database Size</span>
            <span className="storage-value">1.8 GB</span>
          </div>
          <div className="storage-item">
            <span className="storage-label">Cached Data</span>
            <span className="storage-value">345 MB</span>
          </div>
          <div className="storage-item">
            <span className="storage-label">Backup Files</span>
            <span className="storage-value">267 MB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Security Settings Component
const SecuritySettings = ({ settings, onChange }) => {
  return (
    <div className="setting-panel">
      <div className="panel-header">
        <h3>Security & Privacy</h3>
        <p>Manage security settings and access controls</p>
      </div>
      
      <div className="security-section">
        <h4>Authentication</h4>
        <div className="setting-group">
          <ToggleSetting
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            checked={settings.twoFactorAuth}
            onChange={(checked) => onChange('twoFactorAuth', checked)}
          />
          
          <div className="form-group">
            <label>Session Timeout (minutes)</label>
            <select
              value={settings.sessionTimeout}
              onChange={(e) => onChange('sessionTimeout', parseInt(e.target.value))}
              className="form-select"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={480}>8 hours</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="security-section">
        <h4>Password Policy</h4>
        <div className="setting-group">
          <div className="form-group">
            <label>Password Expiry (days)</label>
            <select
              value={settings.passwordExpiry}
              onChange={(e) => onChange('passwordExpiry', parseInt(e.target.value))}
              className="form-select"
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
              <option value={180}>180 days</option>
              <option value={0}>Never</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Max Login Attempts</label>
            <select
              value={settings.loginAttempts}
              onChange={(e) => onChange('loginAttempts', parseInt(e.target.value))}
              className="form-select"
            >
              <option value={3}>3 attempts</option>
              <option value={5}>5 attempts</option>
              <option value={10}>10 attempts</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="security-section">
        <h4>Activity Log</h4>
        <div className="activity-log">
          <div className="activity-item">
            <span className="activity-time">Today, 2:34 PM</span>
            <span className="activity-desc">Password changed</span>
            <span className="activity-location">New York, NY</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">Yesterday, 9:15 AM</span>
            <span className="activity-desc">Login successful</span>
            <span className="activity-location">New York, NY</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">2 days ago, 3:22 PM</span>
            <span className="activity-desc">Settings updated</span>
            <span className="activity-location">New York, NY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toggle Setting Component
const ToggleSetting = ({ label, description, checked, onChange }) => {
  return (
    <div className="toggle-setting">
      <div className="toggle-info">
        <span className="toggle-label">{label}</span>
        <span className="toggle-description">{description}</span>
      </div>
      <div className={`toggle-switch ${checked ? 'active' : ''}`} onClick={() => onChange(!checked)}>
        <div className="toggle-handle"></div>
      </div>
    </div>
  );
};

export default SettingsPage;