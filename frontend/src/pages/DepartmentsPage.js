import React, { useState, useEffect } from 'react';
import TestDataService from '../services/TestDataService';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiZap, FiDollarSign, FiTrendingUp, FiTrendingDown, FiFilter, FiGrid, FiBarChart2, FiSettings } from 'react-icons/fi';
import './DepartmentsPage.css';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'detail'
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('consumption');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = TestDataService.getFormattedData();
      setDepartments(data.departments);
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <div className="departments-loading">
        <div className="loading-spinner"></div>
        <p>Loading departments...</p>
      </div>
    );
  }

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    setViewMode('detail');
  };

  const handleBackToGrid = () => {
    setSelectedDepartment(null);
    setViewMode('grid');
  };

  // Filter and sort departments
  const filteredDepartments = departments
    .filter(dept => {
      if (filterBy === 'all') return true;
      if (filterBy === 'high') return dept.totalConsumption > 8000;
      if (filterBy === 'medium') return dept.totalConsumption >= 5000 && dept.totalConsumption <= 8000;
      if (filterBy === 'low') return dept.totalConsumption < 5000;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'consumption':
          return b.totalConsumption - a.totalConsumption;
        case 'efficiency':
          return b.efficiencyScore - a.efficiencyScore;
        case 'cost':
          return b.monthlyCost - a.monthlyCost;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  if (viewMode === 'detail' && selectedDepartment) {
    return <DepartmentDetailView department={selectedDepartment} onBack={handleBackToGrid} />;
  }

  return (
    <div className="departments-page">
      {/* Page Header */}
      <div className="departments-header">
        <div className="header-info">
          <h2>Department Management</h2>
          <p>Monitor and manage energy consumption across all departments</p>
        </div>
        <div className="header-actions">
          <button className="add-department-btn">
            <FiPlus size={16} />
            Add Department
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="departments-controls">
        <div className="filter-controls">
          <div className="filter-group">
            <FiFilter size={16} />
            <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
              <option value="all">All Departments</option>
              <option value="high">High Consumption (&gt;8k kWh)</option>
              <option value="medium">Medium Consumption (5-8k kWh)</option>
              <option value="low">Low Consumption (&lt;5k kWh)</option>
            </select>
          </div>
          <div className="sort-group">
            <span>Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="consumption">Energy Consumption</option>
              <option value="efficiency">Efficiency Score</option>
              <option value="cost">Monthly Cost</option>
              <option value="name">Department Name</option>
            </select>
          </div>
        </div>
        <div className="view-stats">
          <span>{filteredDepartments.length} departments</span>
          <span>•</span>
          <span>{filteredDepartments.reduce((sum, dept) => sum + dept.totalConsumption, 0).toLocaleString()} kWh total</span>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="departments-grid">
        {filteredDepartments.map((department) => (
          <DepartmentCard
            key={department.id}
            department={department}
            onClick={() => handleDepartmentClick(department)}
          />
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="departments-summary">
        <div className="summary-card">
          <div className="summary-icon"><FiGrid size={20} /></div>
          <div className="summary-content">
            <h3>Total Departments</h3>
            <span className="summary-value">{departments.length}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon"><FiZap size={20} /></div>
          <div className="summary-content">
            <h3>Total Consumption</h3>
            <span className="summary-value">
              {(departments.reduce((sum, dept) => sum + dept.totalConsumption, 0) / 1000).toFixed(1)}k kWh
            </span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon"><FiDollarSign size={20} /></div>
          <div className="summary-content">
            <h3>Total Cost</h3>
            <span className="summary-value">
              ${departments.reduce((sum, dept) => sum + dept.monthlyCost, 0).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon"><FiBarChart2 size={20} /></div>
          <div className="summary-content">
            <h3>Avg Efficiency</h3>
            <span className="summary-value">
              {(departments.reduce((sum, dept) => sum + dept.efficiencyScore, 0) / departments.length).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Department Card Component
const DepartmentCard = ({ department, onClick }) => {
  const getEfficiencyColor = (score) => {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 55) return 'average';
    return 'poor';
  };

  const getTrendIcon = (trend) => {
    return trend > 0 ? <FiTrendingUp className="trend-up" /> : <FiTrendingDown className="trend-down" />;
  };

  return (
    <div className="department-card" onClick={onClick}>
      <div className="department-header">
        <div className="department-info">
          <h3>{department.name}</h3>
          <span className="department-code">{department.code}</span>
        </div>
        <div className="department-actions">
          <button className="action-btn" onClick={(e) => { e.stopPropagation(); }}>
            <FiEdit2 size={14} />
          </button>
          <button className="action-btn delete" onClick={(e) => { e.stopPropagation(); }}>
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>

      <div className="department-metrics">
        <div className="metric">
          <FiUsers size={16} />
          <span>{department.occupancy} people</span>
        </div>
        <div className="metric">
          <FiZap size={16} />
          <span>{department.totalConsumption.toLocaleString()} kWh</span>
        </div>
        <div className="metric">
          <FiDollarSign size={16} />
          <span>${department.monthlyCost.toLocaleString()}</span>
        </div>
      </div>

      <div className="department-efficiency">
        <div className="efficiency-label">
          <span>Efficiency Score</span>
          {getTrendIcon(department.trend)}
        </div>
        <div className={`efficiency-score ${getEfficiencyColor(department.efficiencyScore)}`}>
          {department.efficiencyScore}%
        </div>
        <div className="efficiency-bar">
          <div 
            className={`efficiency-fill ${getEfficiencyColor(department.efficiencyScore)}`}
            style={{ width: `${department.efficiencyScore}%` }}
          ></div>
        </div>
      </div>

      <div className="department-status">
        <span className={`status-badge ${department.status.toLowerCase()}`}>
          {department.status}
        </span>
        <span className="last-updated">Updated 2h ago</span>
      </div>
    </div>
  );
};

// Department Detail View Component
const DepartmentDetailView = ({ department, onBack }) => {
  // Generate sample time series data for the department
  const timeSeriesData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      consumption: department.totalConsumption * (0.8 + Math.random() * 0.4) / 7,
      cost: department.monthlyCost * (0.8 + Math.random() * 0.4) / 30
    };
  });

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    consumption: Math.random() * 500 + 100
  }));

  return (
    <div className="department-detail">
      {/* Detail Header */}
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Departments
        </button>
        <div className="department-title">
          <h2>{department.name}</h2>
          <span className="department-code">{department.code}</span>
        </div>
        <div className="detail-actions">
          <button className="edit-btn">
            <FiEdit2 size={16} />
            Edit Department
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="detail-metrics">
        <div className="detail-metric-card">
          <h3>Monthly Consumption</h3>
          <div className="metric-value">{department.totalConsumption.toLocaleString()} kWh</div>
          <div className="metric-change positive">↑ 5.2% vs last month</div>
        </div>
        <div className="detail-metric-card">
          <h3>Monthly Cost</h3>
          <div className="metric-value">${department.monthlyCost.toLocaleString()}</div>
          <div className="metric-change negative">↓ 2.8% vs last month</div>
        </div>
        <div className="detail-metric-card">
          <h3>Efficiency Score</h3>
          <div className="metric-value">{department.efficiencyScore}%</div>
          <div className="metric-change positive">↑ 1.5% vs last month</div>
        </div>
        <div className="detail-metric-card">
          <h3>Occupancy</h3>
          <div className="metric-value">{department.occupancy}</div>
          <div className="metric-change neutral">= vs last month</div>
        </div>
      </div>

      {/* Charts */}
      <div className="detail-charts">
        <div className="chart-section">
          <h3>Weekly Consumption Trend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#718096" />
                <YAxis stroke="#718096" />
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(1)} kWh`, 'Consumption']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="consumption" stroke="#3498db" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section">
          <h3>Hourly Usage Pattern (Today)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#718096" />
                <YAxis stroke="#718096" />
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(1)} kWh`, 'Consumption']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="consumption" fill="#27ae60" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Equipment & Recommendations */}
      <div className="detail-bottom">
        <div className="equipment-section">
          <h3>Major Equipment</h3>
          <div className="equipment-list">
            <div className="equipment-item">
              <div className="equipment-info">
                <span className="equipment-name">HVAC System A1</span>
                <span className="equipment-status active">Active</span>
              </div>
              <div className="equipment-consumption">2,450 kWh/month</div>
            </div>
            <div className="equipment-item">
              <div className="equipment-info">
                <span className="equipment-name">Lighting System</span>
                <span className="equipment-status active">Active</span>
              </div>
              <div className="equipment-consumption">890 kWh/month</div>
            </div>
            <div className="equipment-item">
              <div className="equipment-info">
                <span className="equipment-name">Lab Equipment</span>
                <span className="equipment-status maintenance">Maintenance</span>
              </div>
              <div className="equipment-consumption">1,200 kWh/month</div>
            </div>
          </div>
        </div>

        <div className="recommendations-section">
          <h3>AI Recommendations</h3>
          <div className="recommendations-list">
            <div className="recommendation-item">
              <div className="recommendation-icon"><FiZap size={18} /></div>
              <div className="recommendation-content">
                <h4>Optimize HVAC Schedule</h4>
                <p>Adjust cooling during off-peak hours to save 12% energy</p>
                <span className="potential-savings">Potential: $240/month</span>
              </div>
            </div>
            <div className="recommendation-item">
              <div className="recommendation-icon"><FiSettings size={18} /></div>
              <div className="recommendation-content">
                <h4>Equipment Maintenance</h4>
                <p>Schedule maintenance for Lab Equipment to improve efficiency</p>
                <span className="potential-savings">Potential: $180/month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsPage;