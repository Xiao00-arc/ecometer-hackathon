import React, { useState, useEffect } from 'react';
import TestDataService from '../services/TestDataService';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiTrendingUp, FiTrendingDown, FiCalendar, FiDownload, FiZap, FiDollarSign, FiActivity, FiBarChart2 } from 'react-icons/fi';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = TestDataService.getAnalyticsData(timeRange);
      setAnalyticsData(data);
      setLoading(false);
    }, 500);
  }, [timeRange]);

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="loading-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  // Prepare chart data
  const energyTrendData = Object.entries(analyticsData.timeSeriesData).slice(-7).map(([date, sources]) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    electricity: sources.ELECTRICITY || 0,
    heating: sources.HEATING || 0,
    cooling: sources.COOLING || 0,
    transport: sources.TRANSPORT || 0,
    waste: sources.WASTE || 0,
    total: Object.values(sources).reduce((sum, val) => sum + val, 0)
  }));

  const departmentData = analyticsData.departmentComparison;

  const sourceDistribution = [
    { name: 'Electricity', value: 65, color: '#3498db' },
    { name: 'Heating', value: 15, color: '#e74c3c' },
    { name: 'Cooling', value: 12, color: '#f39c12' },
    { name: 'Transport', value: 5, color: '#27ae60' },
    { name: 'Waste', value: 3, color: '#9b59b6' }
  ];

  return (
    <div className="analytics-page">
      {/* Analytics Header */}
      <div className="analytics-header">
        <div className="header-info">
          <h2>Energy Analytics</h2>
          <p>Comprehensive analysis of campus energy consumption patterns</p>
        </div>
        <div className="header-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-selector"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="export-btn">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-overview">
        <div className="metric-card">
          <div className="metric-icon energy"><FiZap size={20} /></div>
          <div className="metric-content">
            <h3>Energy Trend</h3>
            <div className="metric-value">
              {analyticsData.trends.energyTrend > 0 ? (
                <FiTrendingUp className="trend-up" />
              ) : (
                <FiTrendingDown className="trend-down" />
              )}
              <span>{Math.abs(analyticsData.trends.energyTrend).toFixed(1)}%</span>
            </div>
            <p>vs previous period</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon cost"><FiDollarSign size={20} /></div>
          <div className="metric-content">
            <h3>Cost Savings</h3>
            <div className="metric-value">
              <FiTrendingDown className="trend-down" />
              <span>{Math.abs(analyticsData.trends.costTrend).toFixed(1)}%</span>
            </div>
            <p>reduction achieved</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon carbon"><FiActivity size={20} /></div>
          <div className="metric-content">
            <h3>Carbon Reduction</h3>
            <div className="metric-value">
              <FiTrendingDown className="trend-down" />
              <span>{Math.abs(analyticsData.trends.carbonTrend).toFixed(1)}%</span>
            </div>
            <p>emissions reduced</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon efficiency"><FiBarChart2 size={20} /></div>
          <div className="metric-content">
            <h3>Efficiency Gain</h3>
            <div className="metric-value">
              <FiTrendingUp className="trend-up" />
              <span>{analyticsData.trends.efficiencyTrend.toFixed(1)}%</span>
            </div>
            <p>improvement</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Energy Consumption Trend */}
        <div className="chart-card large">
          <div className="chart-header">
            <h3>Energy Consumption Trend</h3>
            <div className="chart-legend">
              <span className="legend-item electricity">● Electricity</span>
              <span className="legend-item heating">● Heating</span>
              <span className="legend-item cooling">● Cooling</span>
              <span className="legend-item transport">● Transport</span>
              <span className="legend-item waste">● Waste</span>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={energyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#718096" fontSize={12} />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line type="monotone" dataKey="electricity" stroke="#3498db" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="heating" stroke="#e74c3c" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="cooling" stroke="#f39c12" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="transport" stroke="#27ae60" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="waste" stroke="#9b59b6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Energy Source Distribution</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Share']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pie-legend">
            {sourceDistribution.map((item, index) => (
              <div key={index} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Comparison */}
        <div className="chart-card large">
          <div className="chart-header">
            <h3>Department Energy Comparison</h3>
            <p>Total consumption and efficiency ratings</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="code" stroke="#718096" fontSize={12} />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'totalConsumption' ? `${value.toFixed(1)} kWh` : `${value.toFixed(1)}%`,
                    name === 'totalConsumption' ? 'Energy Consumption' : 'Efficiency Score'
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="totalConsumption" fill="#3498db" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Predictions & Insights */}
      <div className="predictions-section">
        <div className="prediction-card">
          <h3><FiTrendingUp className="prediction-icon" /> Next Month Forecast</h3>
          <div className="prediction-metrics">
            <div className="prediction-item">
              <span className="prediction-label">Expected Consumption</span>
              <span className="prediction-value">{analyticsData.predictions.nextMonth.expectedConsumption.toLocaleString()} kWh</span>
            </div>
            <div className="prediction-item">
              <span className="prediction-label">Estimated Cost</span>
              <span className="prediction-value">${analyticsData.predictions.nextMonth.estimatedCost.toLocaleString()}</span>
            </div>
            <div className="prediction-item">
              <span className="prediction-label">Carbon Footprint</span>
              <span className="prediction-value">{(analyticsData.predictions.nextMonth.carbonFootprint / 1000).toFixed(1)}t CO₂</span>
            </div>
          </div>
        </div>

        <div className="prediction-card">
          <h3><FiCalendar className="prediction-icon" /> Year-End Projections</h3>
          <div className="prediction-metrics">
            <div className="prediction-item">
              <span className="prediction-label">Total Consumption</span>
              <span className="prediction-value">{(analyticsData.predictions.yearEnd.expectedConsumption / 1000000).toFixed(2)}M kWh</span>
            </div>
            <div className="prediction-item">
              <span className="prediction-label">Total Cost</span>
              <span className="prediction-value">${(analyticsData.predictions.yearEnd.estimatedCost / 1000).toFixed(0)}K</span>
            </div>
            <div className="prediction-item">
              <span className="prediction-label">Total Emissions</span>
              <span className="prediction-value">{(analyticsData.predictions.yearEnd.carbonFootprint / 1000000).toFixed(0)}kt CO₂</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;