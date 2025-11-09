import React, { useState } from 'react';
import { FaDatabase, FaSync, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
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
  React.useEffect(() => {
    checkDataStatus();
  }, []);

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>System Settings</h1>
        <p>Configure your EcoMeter system and manage test data</p>
      </div>

      <div className="settings-section">
        <div className="section-header">
          <FaDatabase className="section-icon" />
          <h2>Database Management</h2>
        </div>

        {dataStatus && (
          <div className="data-status">
            <h3>Current Data Status</h3>
            <div className="status-grid">
              <div className="status-item">
                <span className="status-label">Departments:</span>
                <span className="status-value">{dataStatus.departments}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Energy Data:</span>
                <span className="status-value">{dataStatus.energyData}</span>
              </div>
              <div className="status-item">
                <span className="status-label">AI Suggestions:</span>
                <span className="status-value">{dataStatus.aiSuggestions}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Has Data:</span>
                <span className={`status-value ${dataStatus.hasData ? 'has-data' : 'no-data'}`}>
                  {dataStatus.hasData ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={initializeTestData}
            disabled={loading}
          >
            {loading ? <FaSync className="spinning" /> : <FaDatabase />}
            Initialize Test Data
          </button>

          <button 
            className="btn btn-warning"
            onClick={resetAndInitialize}
            disabled={loading}
          >
            {loading ? <FaSync className="spinning" /> : <FaSync />}
            Reset & Reload Data
          </button>

          <button 
            className="btn btn-secondary"
            onClick={checkDataStatus}
            disabled={loading}
          >
            <FaSync />
            Refresh Status
          </button>
        </div>

        {message && (
          <div className={`message message-${messageType}`}>
            {messageType === 'success' && <FaCheckCircle />}
            {messageType === 'warning' && <FaExclamationTriangle />}
            {messageType === 'error' && <FaExclamationTriangle />}
            <span>{message}</span>
          </div>
        )}
      </div>

      <div className="settings-section">
        <div className="section-header">
          <h2>Setup Instructions</h2>
        </div>
        <div className="instructions">
          <h4>For New Users:</h4>
          <ol>
            <li>Ensure your MySQL database is running and the ECO_DB database exists</li>
            <li>Make sure the backend server is running on port 8081</li>
            <li>Click "Initialize Test Data" to load sample departments, energy data, and AI suggestions</li>
            <li>Navigate to other pages to see the data in action</li>
          </ol>
          
          <h4>Sample Data Includes:</h4>
          <ul>
            <li>5 Departments (CSE, VLSI Lab, Admin Office, Library, Cafeteria)</li>
            <li>12 Energy readings with consumption data</li>
            <li>6 AI suggestions for energy optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;