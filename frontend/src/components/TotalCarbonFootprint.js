import React from 'react';
import './TotalCarbonFootprint.css';

const TotalCarbonFootprint = ({ totalCarbon, totalCost, totalKwh }) => {
  // Format numbers for display
  const formatNumber = (num) => {
    if (!num) return '0';
    return parseFloat(num).toFixed(2);
  };

  const formatCurrency = (num) => {
    if (!num) return '$0.00';
    return `$${parseFloat(num).toFixed(2)}`;
  };

  // Calculate percentage changes (mock data for demo)
  const carbonChange = 8.5; // % reduction from last month
  const costSavings = 12.3; // % savings from last month

  return (
    <div className="carbon-footprint-container">
      <div className="main-stat-card">
        <div className="stat-icon">🌍</div>
        <div className="stat-content">
          <h2>Total Carbon Footprint</h2>
          <div className="main-number">
            {formatNumber(totalCarbon)} <span className="unit">kg CO₂</span>
          </div>
          <div className={`change-indicator ${carbonChange > 0 ? 'positive' : 'negative'}`}>
            <span className="change-arrow">{carbonChange > 0 ? '↓' : '↑'}</span>
            {Math.abs(carbonChange)}% vs last month
          </div>
        </div>
      </div>

      <div className="secondary-stats">
        <div className="stat-card energy">
          <div className="stat-header">
            <span className="stat-icon-small">⚡</span>
            <h3>Energy Usage</h3>
          </div>
          <div className="stat-value">
            {formatNumber(totalKwh)} <span className="unit">kWh</span>
          </div>
          <div className="stat-subtitle">Last 24 hours</div>
        </div>

        <div className="stat-card cost">
          <div className="stat-header">
            <span className="stat-icon-small">💰</span>
            <h3>Total Cost</h3>
          </div>
          <div className="stat-value">
            {formatCurrency(totalCost)}
          </div>
          <div className="stat-subtitle">
            <span className={`savings ${costSavings > 0 ? 'positive' : 'negative'}`}>
              {costSavings > 0 ? '↓' : '↑'} {Math.abs(costSavings)}% saved
            </span>
          </div>
        </div>

        <div className="stat-card efficiency">
          <div className="stat-header">
            <span className="stat-icon-small">📊</span>
            <h3>Efficiency</h3>
          </div>
          <div className="stat-value">
            {totalCarbon && totalKwh ? formatNumber((totalCarbon / totalKwh) * 1000) : '0'} 
            <span className="unit">g/kWh</span>
          </div>
          <div className="stat-subtitle">Carbon intensity</div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="progress-section">
        <div className="progress-item">
          <div className="progress-label">
            <span>Daily Target</span>
            <span>78%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '78%' }}></div>
          </div>
        </div>
        
        <div className="progress-item">
          <div className="progress-label">
            <span>Monthly Goal</span>
            <span>45%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill monthly" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCarbonFootprint;