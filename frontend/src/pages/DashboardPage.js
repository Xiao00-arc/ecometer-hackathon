import React, { useState, useEffect, useRef } from 'react';
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
  const [isSimulating, setIsSimulating] = useState(false);
  const simulationInterval = useRef(null);

  useEffect(() => {
    // Simulate API call with test data
    setTimeout(() => {
      const data = TestDataService.getDashboardData();
      setDashboardData(data);
      setLoading(false);
    }, 500);
  }, []);

  // Clean up simulation interval on component unmount
  useEffect(() => {
    return () => {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    };
  }, []);

  // Generate random sensor data and send to backend
  const generateAndSendData = async () => {
    try {
      // Generate random data
      const departmentId = Math.floor(Math.random() * 5) + 1; // Random 1-5
      const kwhUsed = Math.random() * 4.5 + 0.5; // Random 0.5-5.0
      const sourceType = Math.random() > 0.3 ? 'ELECTRICITY' : 'HEATING'; // 70% ELECTRICITY, 30% HEATING
      const costUsd = kwhUsed * 0.12; // kwh * $0.12
      const carbonKg = kwhUsed * 0.45; // kwh * 0.45 kg CO₂

      const payload = {
        departmentId,
        kwhUsed: parseFloat(kwhUsed.toFixed(2)),
        sourceType,
        costUsd: parseFloat(costUsd.toFixed(2)),
        carbonKg: parseFloat(carbonKg.toFixed(2))
      };

      // Send to backend API
      const response = await fetch('http://localhost:8081/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('✅ Virtual sensor data sent:', payload);
      } else {
        console.error('❌ Failed to send sensor data:', response.statusText);
      }
    } catch (error) {
      console.error('❌ Error sending virtual sensor data:', error);
    }
  };

  // Toggle simulation on/off
  const toggleSimulation = () => {
    if (isSimulating) {
      // Stop simulation
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
        simulationInterval.current = null;
      }
      setIsSimulating(false);
      console.log('🛑 Virtual sensor simulation stopped');
    } else {
      // Start simulation
      setIsSimulating(true);
      console.log('🟢 Virtual sensor simulation started');
      
      // Send first data immediately
      generateAndSendData();
      
      // Then continue every 3 seconds
      simulationInterval.current = setInterval(() => {
        generateAndSendData();
      }, 3000);
    }
  };

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
      {/* Live Simulation Badge */}
      {isSimulating && (
        <div className="simulation-badge">
          <span className="pulse-dot">🔴</span>
          <span className="simulation-text">Live Simulation Active</span>
          <span className="simulation-info">(Generating data every 3 seconds)</span>
        </div>
      )}
      
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

        {/* Real-time Energy Data */}
        <div className="dashboard-card realtime-data">
          <div className="card-header">
            <h3>
              <FiActivity className="activity-icon" />
              Live Energy Data
            </h3>
            {isSimulating && (
              <span className="live-badge">
                <span className="pulse-dot">🟢</span> LIVE
              </span>
            )}
          </div>
          <RealTimeEnergyData isSimulating={isSimulating} />
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
              title={isSimulating ? "STOP Simulation" : "Simulate Data"}
              description={isSimulating ? "Stop virtual sensor readings" : "Start virtual IoT sensors"}
              action={toggleSimulation}
              isActive={isSimulating}
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
const ActionButton = ({ icon, title, description, action, isActive = false }) => {
  return (
    <button className={`action-button ${isActive ? 'active' : ''}`} onClick={action}>
      <div className="action-icon">{icon}</div>
      <div className="action-content">
        <h5 className="action-title">{title}</h5>
        <p className="action-description">{description}</p>
      </div>
    </button>
  );
};

// Real-time Energy Data Component
const RealTimeEnergyData = ({ isSimulating }) => {
  const [energyData, setEnergyData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch latest energy data
  const fetchEnergyData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8081/api/energy?limit=5');
      if (response.ok) {
        const data = await response.json();
        setEnergyData(data);
      }
    } catch (error) {
      console.error('Error fetching energy data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when simulation starts
  useEffect(() => {
    fetchEnergyData();
  }, []);

  // Auto-refresh when simulating
  useEffect(() => {
    let interval;
    if (isSimulating) {
      interval = setInterval(() => {
        fetchEnergyData();
      }, 4000); // Refresh every 4 seconds (slightly offset from simulation)
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating]);

  const getDepartmentName = (departmentId) => {
    const deptNames = {
      1: 'Computer Science',
      2: 'VLSI Design',
      3: 'Administration', 
      4: 'Library',
      5: 'Cafeteria'
    };
    return deptNames[departmentId] || `Dept ${departmentId}`;
  };

  const getSourceTypeColor = (sourceType) => {
    switch (sourceType) {
      case 'ELECTRICITY': return '#3498db';
      case 'HEATING': return '#e74c3c';
      case 'COOLING': return '#9b59b6';
      case 'TRANSPORT': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  if (loading && energyData.length === 0) {
    return (
      <div className="loading-state">
        <div className="mini-spinner"></div>
        <p>Loading energy data...</p>
      </div>
    );
  }

  return (
    <div className="realtime-energy-list">
      {energyData.length === 0 ? (
        <div className="no-data">
          <FiZap className="no-data-icon" />
          <p>No energy data available</p>
          <small>Start simulation to see live data</small>
        </div>
      ) : (
        energyData.map((reading, index) => (
          <div key={reading.id || index} className="energy-reading">
            <div className="reading-header">
              <div className="department-info">
                <span className="dept-name">{getDepartmentName(reading.department?.id)}</span>
                <span 
                  className="source-type"
                  style={{ backgroundColor: `${getSourceTypeColor(reading.sourceType)}20`, color: getSourceTypeColor(reading.sourceType) }}
                >
                  {reading.sourceType}
                </span>
              </div>
              <div className="reading-time">
                {new Date(reading.createdAt).toLocaleTimeString()}
              </div>
            </div>
            <div className="reading-metrics">
              <div className="metric">
                <span className="metric-label">Energy</span>
                <span className="metric-value">{reading.kwhUsed} kWh</span>
              </div>
              <div className="metric">
                <span className="metric-label">Cost</span>
                <span className="metric-value">${reading.costUsd}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Carbon</span>
                <span className="metric-value">{reading.carbonKg} kg</span>
              </div>
            </div>
          </div>
        ))
      )}
      
      {isSimulating && (
        <div className="simulation-status">
          <FiActivity className="activity-icon" />
          <span>Receiving live data every 3 seconds</span>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;