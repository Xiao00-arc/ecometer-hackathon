import React, { useState, useEffect } from 'react';
import TestDataService from '../services/TestDataService';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiActivity, 
  FiDollarSign, 
  FiZap,
  FiAlertTriangle,
  FiCheckCircle,
  FiCpu,
  FiBarChart2,
  FiSettings,
  FiSmartphone
} from 'react-icons/fi';
import './DashboardPage.css';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with test data
    setTimeout(() => {
      const data = TestDataService.getDashboardData();
      setDashboardData(data);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Quick Stats Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Carbon Footprint"
          value={`${dashboardData.totalCarbonFootprint.toFixed(2)} kg CO₂`}
          change={-8.5}
          icon={<FiActivity />}
          color="green"
        />
        <StatCard
          title="Energy Consumption"
          value={`${dashboardData.totalKwhUsed.toFixed(1)} kWh`}
          change={-5.2}
          icon={<FiZap />}
          color="blue"
        />
        <StatCard
          title="Total Cost"
          value={`$${dashboardData.totalCostUsd.toFixed(2)}`}
          change={-12.3}
          icon={<FiDollarSign />}
          color="purple"
        />
        <StatCard
          title="Efficiency Score"
          value="87.5%"
          change={6.8}
          icon={<FiTrendingUp />}
          color="orange"
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-grid">
        {/* Department Performance */}
        <div className="dashboard-card department-performance">
          <div className="card-header">
            <h3>Department Performance</h3>
            <div className="card-actions">
              <select className="time-selector">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
          </div>
          <div className="department-list">
            {dashboardData.departmentSummaries.map((dept, index) => (
              <DepartmentCard key={index} department={dept} />
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="dashboard-card ai-recommendations">
          <div className="card-header">
            <h3>
                <span className="ai-icon"><FiCpu /></span>
              AI Recommendations
            </h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="recommendations-list">
            {dashboardData.aiSuggestions.map((suggestion) => (
              <RecommendationCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="dashboard-card alerts-panel">
          <div className="card-header">
            <h3>
              <FiAlertTriangle className="alert-icon" />
              System Alerts
            </h3>
            <span className="alert-count">{dashboardData.alerts.length}</span>
          </div>
          <div className="alerts-list">
            {dashboardData.alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
            {dashboardData.alerts.length === 0 && (
              <div className="no-alerts">
                <FiCheckCircle className="check-icon" />
                <p>All systems operating normally</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card quick-actions">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="actions-grid">
            <ActionButton
              icon={<FiBarChart2 size={20} />}
              title="Generate Report"
              description="Create detailed energy report"
              action={() => alert('Generate Report clicked')}
            />
            <ActionButton
              icon={<FiZap size={20} />}
              title="Simulate Data"
              description="Add sample IoT readings"
              action={() => alert('Simulate Data clicked')}
            />
            <ActionButton
              icon={<FiSettings size={20} />}
              title="System Settings"
              description="Configure dashboard preferences"
              action={() => alert('Settings clicked')}
            />
            <ActionButton
              icon={<FiSmartphone size={20} />}
              title="Mobile App"
              description="Download mobile companion"
              action={() => alert('Mobile App clicked')}
            />
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="footer-stats">
        <div className="stat-item">
          <span className="stat-label">Last Updated</span>
          <span className="stat-value">{new Date(dashboardData.lastUpdated).toLocaleTimeString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Active Sensors</span>
          <span className="stat-value">47 devices</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Data Points Today</span>
          <span className="stat-value">1,247</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">System Status</span>
          <span className="stat-value status-online"><FiCheckCircle className="status-icon" /> Online</span>
        </div>
      </div>
    </div>
  );
};

// StatCard Component
const StatCard = ({ title, value, change, icon, color }) => {
  const isPositive = change > 0;
  const isNeutral = Math.abs(change) < 1;

  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">
        {icon}
      </div>
      <div className="stat-content">
        <h4 className="stat-title">{title}</h4>
        <div className="stat-value">{value}</div>
        <div className={`stat-change ${isNeutral ? 'neutral' : isPositive ? 'positive' : 'negative'}`}>
          {isNeutral ? (
            <span>No change</span>
          ) : (
            <>
              {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
              <span>{Math.abs(change).toFixed(1)}% vs last period</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// DepartmentCard Component
const DepartmentCard = ({ department }) => {
  const efficiency = parseFloat(department.efficiency) || 85;
  const getEfficiencyColor = (rating) => {
    if (rating >= 90) return '#48bb78';
    if (rating >= 80) return '#ed8936';
    return '#e53e3e';
  };

  return (
    <div className="department-card">
      <div className="dept-header">
        <div className="dept-info">
          <h4>{department.departmentName}</h4>
          <span className="dept-code">{department.departmentCode}</span>
        </div>
        <div 
          className="efficiency-badge"
          style={{ backgroundColor: `${getEfficiencyColor(efficiency)}20`, color: getEfficiencyColor(efficiency) }}
        >
          {department.efficiency || 'B+'}
        </div>
      </div>
      
      <div className="dept-metrics">
        <div className="metric">
          <span className="metric-label">Energy</span>
          <span className="metric-value">{department.totalKwh.toFixed(1)} kWh</span>
        </div>
        <div className="metric">
          <span className="metric-label">Carbon</span>
          <span className="metric-value">{department.totalCarbonKg.toFixed(2)} kg</span>
        </div>
        <div className="metric">
          <span className="metric-label">Cost</span>
          <span className="metric-value">${department.totalCostUsd.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// RecommendationCard Component
const RecommendationCard = ({ suggestion }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#e53e3e';
      case 'MEDIUM': return '#ed8936';
      case 'LOW': return '#48bb78';
      default: return '#718096';
    }
  };

  return (
    <div className="recommendation-card">
      <div className="rec-header">
        <span 
          className="priority-badge"
          style={{ 
            backgroundColor: `${getPriorityColor(suggestion.priority)}20`,
            color: getPriorityColor(suggestion.priority)
          }}
        >
          {suggestion.priority}
        </span>
        <span className="savings-amount">
          ${suggestion.estimatedSavingsUsd}
        </span>
      </div>
      <h4 className="rec-title">{suggestion.title}</h4>
      <p className="rec-description">{suggestion.description}</p>
      <div className="rec-actions">
        <button className="rec-btn primary">View Details</button>
        <button className="rec-btn secondary">Dismiss</button>
      </div>
    </div>
  );
};

// AlertCard Component
const AlertCard = ({ alert }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#e53e3e';
      case 'medium': return '#ed8936';
      case 'low': return '#48bb78';
      default: return '#718096';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <FiAlertTriangle style={{ color: '#e53e3e' }} />;
      case 'medium': return <FiAlertTriangle style={{ color: '#ed8936' }} />;
      case 'low': return <FiCheckCircle style={{ color: '#48bb78' }} />;
      default: return <FiActivity style={{ color: '#718096' }} />;
    }
  };

  return (
    <div className="alert-card">
      <div className="alert-header">
        <span className="alert-severity">{getSeverityIcon(alert.severity)}</span>
        <span className="alert-time">
          {new Date(alert.timestamp).toLocaleTimeString()}
        </span>
      </div>
      <h4 className="alert-title">{alert.title}</h4>
      <p className="alert-message">{alert.message}</p>
      <div className="alert-department">Department: {alert.department}</div>
    </div>
  );
};

// ActionButton Component
const ActionButton = ({ icon, title, description, action }) => {
  return (
    <button className="action-button" onClick={action}>
      <div className="action-icon">{icon}</div>
      <div className="action-content">
        <h5 className="action-title">{title}</h5>
        <p className="action-description">{description}</p>
      </div>
    </button>
  );
};

export default DashboardPage;