import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalCarbonFootprint from './components/TotalCarbonFootprint';
import DepartmentScorecard from './components/DepartmentScorecard';
import AISuggestions from './components/AISuggestions';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // API base URL - adjust if your Spring Boot runs on different port
  const API_BASE_URL = 'http://localhost:8081/api';

  // Fetch dashboard data from Spring Boot API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/dashboard-data`);
      setDashboardData(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 30 seconds (for demo purposes)
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle manual refresh
  const handleRefresh = () => {
    fetchDashboardData();
  };

  if (loading && !dashboardData) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading EcoMeter Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>⚠️ Connection Error</h2>
        <p>{error}</p>
        <button onClick={handleRefresh} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            🌱 EcoMeter Dashboard
          </h1>
          <div className="header-info">
            <span className="last-updated">
              Last updated: {lastUpdated}
            </span>
            <button 
              onClick={handleRefresh} 
              className="refresh-button"
              disabled={loading}
            >
              {loading ? '⟳' : '🔄'} Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        {dashboardData && (
          <>
            {/* Top Stats Row */}
            <section className="stats-section">
              <TotalCarbonFootprint 
                totalCarbon={dashboardData.totalCarbonFootprint}
                totalCost={dashboardData.totalCostUsd}
                totalKwh={dashboardData.totalKwhUsed}
              />
            </section>

            {/* Charts and Insights Row */}
            <section className="charts-section">
              <div className="chart-container">
                <DepartmentScorecard 
                  departments={dashboardData.departmentSummaries}
                />
              </div>
              
              <div className="suggestions-container">
                <AISuggestions 
                  suggestions={dashboardData.aiSuggestions}
                />
              </div>
            </section>

            {/* Quick Actions */}
            <section className="actions-section">
              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <button className="action-button primary">
                  📊 View Detailed Report
                </button>
                <button className="action-button secondary">
                  ⚡ Simulate IoT Data
                </button>
                <button className="action-button secondary">
                  💡 Get More Suggestions
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>EcoMeter - Smart Campus Energy Management | Hackathon Prototype 2025</p>
      </footer>
    </div>
  );
};

export default Dashboard;