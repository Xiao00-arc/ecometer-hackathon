import React, { useState, useEffect } from 'react';
import TestDataService from '../services/TestDataService';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiDownload, FiCalendar, FiFileText, FiShare2, FiFilter, FiPrinter, FiMail } from 'react-icons/fi';
import './ReportsPage.css';

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState('energy-summary');
  const [dateRange, setDateRange] = useState('30d');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = TestDataService.getFormattedData();
      setReportData(data);
      setLoading(false);
    }, 500);
  }, [selectedReport, dateRange]);

  const reportTypes = [
    { id: 'energy-summary', name: 'Energy Summary Report', description: 'Overall energy consumption and trends' },
    { id: 'cost-analysis', name: 'Cost Analysis Report', description: 'Financial impact and cost breakdown' },
    { id: 'carbon-footprint', name: 'Carbon Footprint Report', description: 'Environmental impact assessment' },
    { id: 'department-comparison', name: 'Department Comparison', description: 'Performance across departments' },
    { id: 'efficiency-report', name: 'Efficiency Analysis', description: 'Energy efficiency metrics and recommendations' },
    { id: 'compliance-report', name: 'Compliance Report', description: 'Regulatory compliance and standards' }
  ];

  const handleExport = (format) => {
    // In a real app, this would generate and download the report
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  if (loading) {
    return (
      <div className="reports-loading">
        <div className="loading-spinner"></div>
        <p>Generating report...</p>
      </div>
    );
  }

  return (
    <div className="reports-page">
      {/* Reports Header */}
      <div className="reports-header">
        <div className="header-info">
          <h2>Reports & Analytics</h2>
          <p>Generate comprehensive reports and export data insights</p>
        </div>
        <div className="header-actions">
          <button className="schedule-btn">
            <FiCalendar size={16} />
            Schedule Report
          </button>
          <button className="export-dropdown">
            <FiDownload size={16} />
            Export Options
          </button>
        </div>
      </div>

      <div className="reports-container">
        {/* Report Selection Sidebar */}
        <div className="report-sidebar">
          <div className="sidebar-header">
            <h3>Report Types</h3>
            <div className="date-range-selector">
              <FiCalendar size={16} />
              <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
          </div>
          
          <div className="report-types-list">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className={`report-type-item ${selectedReport === report.id ? 'active' : ''}`}
                onClick={() => setSelectedReport(report.id)}
              >
                <div className="report-icon">
                  <FiFileText size={20} />
                </div>
                <div className="report-info">
                  <h4>{report.name}</h4>
                  <p>{report.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Content */}
        <div className="report-content">
          <ReportContent 
            reportType={selectedReport} 
            dateRange={dateRange} 
            data={reportData}
            onExport={handleExport}
          />
        </div>
      </div>
    </div>
  );
};

// Report Content Component
const ReportContent = ({ reportType, dateRange, data, onExport }) => {
  const getReportTitle = () => {
    const reportTitles = {
      'energy-summary': 'Energy Summary Report',
      'cost-analysis': 'Cost Analysis Report',
      'carbon-footprint': 'Carbon Footprint Report',
      'department-comparison': 'Department Comparison Report',
      'efficiency-report': 'Efficiency Analysis Report',
      'compliance-report': 'Compliance Report'
    };
    return reportTitles[reportType];
  };

  const generateDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Sample chart data
  const energyTrendData = data.departments.slice(0, 5).map(dept => ({
    department: dept.code,
    consumption: dept.totalConsumption,
    cost: dept.monthlyCost,
    efficiency: dept.efficiencyScore
  }));

  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 5 + i);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      consumption: Math.random() * 50000 + 30000,
      cost: Math.random() * 15000 + 8000,
      carbon: Math.random() * 25 + 15
    };
  });

  const sourceDistribution = [
    { name: 'Electricity', value: 65, color: '#3498db', amount: 45500 },
    { name: 'Heating', value: 15, color: '#e74c3c', amount: 10500 },
    { name: 'Cooling', value: 12, color: '#f39c12', amount: 8400 },
    { name: 'Transport', value: 5, color: '#27ae60', amount: 3500 },
    { name: 'Waste', value: 3, color: '#9b59b6', amount: 2100 }
  ];

  return (
    <div className="report-document">
      {/* Report Header */}
      <div className="report-header">
        <div className="report-title-section">
          <h1>{getReportTitle()}</h1>
          <div className="report-metadata">
            <span>Generated on: {generateDate()}</span>
            <span>Period: {dateRange === '7d' ? 'Last 7 Days' : dateRange === '30d' ? 'Last 30 Days' : dateRange === '90d' ? 'Last 90 Days' : 'Last Year'}</span>
            <span>Campus: Main University Campus</span>
          </div>
        </div>
        
        <div className="report-actions">
          <button className="action-btn" onClick={() => window.print()}>
            <FiPrinter size={16} />
          </button>
          <button className="action-btn" onClick={() => onExport('pdf')}>
            <FiDownload size={16} />
          </button>
          <button className="action-btn">
            <FiShare2 size={16} />
          </button>
          <button className="action-btn">
            <FiMail size={16} />
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="report-section">
        <h2>Executive Summary</h2>
        <div className="summary-grid">
          <div className="summary-stat">
            <h3>Total Energy Consumption</h3>
            <div className="stat-value">{data.departments.reduce((sum, dept) => sum + dept.totalConsumption, 0).toLocaleString()} kWh</div>
            <div className="stat-change positive">↓ 5.2% vs previous period</div>
          </div>
          <div className="summary-stat">
            <h3>Total Cost</h3>
            <div className="stat-value">${data.departments.reduce((sum, dept) => sum + dept.monthlyCost, 0).toLocaleString()}</div>
            <div className="stat-change positive">↓ 3.8% vs previous period</div>
          </div>
          <div className="summary-stat">
            <h3>Carbon Emissions</h3>
            <div className="stat-value">42.5 tons CO₂</div>
            <div className="stat-change positive">↓ 7.1% vs previous period</div>
          </div>
          <div className="summary-stat">
            <h3>Average Efficiency</h3>
            <div className="stat-value">{(data.departments.reduce((sum, dept) => sum + dept.efficiencyScore, 0) / data.departments.length).toFixed(1)}%</div>
            <div className="stat-change positive">↑ 2.3% vs previous period</div>
          </div>
        </div>
      </div>

      {/* Charts and Visualizations */}
      <div className="report-section">
        <h2>Energy Consumption Analysis</h2>
        
        <div className="chart-row">
          <div className="chart-container-report">
            <h3>Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#718096" />
                <YAxis stroke="#718096" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'consumption' ? `${value.toLocaleString()} kWh` : 
                    name === 'cost' ? `$${value.toLocaleString()}` : `${value.toFixed(1)} tons`,
                    name === 'consumption' ? 'Consumption' : name === 'cost' ? 'Cost' : 'Carbon Emissions'
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="consumption" stroke="#3498db" strokeWidth={3} />
                <Line type="monotone" dataKey="cost" stroke="#e74c3c" strokeWidth={2} />
                <Line type="monotone" dataKey="carbon" stroke="#27ae60" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-container-report">
            <h3>Energy Source Distribution</h3>
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
                  formatter={(value, name, props) => [`${value}% (${props.payload.amount.toLocaleString()} kWh)`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend-report">
              {sourceDistribution.map((item, index) => (
                <div key={index} className="legend-item-report">
                  <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}: {item.value}% ({item.amount.toLocaleString()} kWh)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="report-section">
        <h2>Department Performance</h2>
        <div className="chart-container-report full-width">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={energyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="department" stroke="#718096" />
              <YAxis yAxisId="left" stroke="#718096" />
              <YAxis yAxisId="right" orientation="right" stroke="#718096" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'consumption' ? `${value.toLocaleString()} kWh` : 
                  name === 'cost' ? `$${value.toLocaleString()}` : `${value.toFixed(1)}%`,
                  name === 'consumption' ? 'Consumption' : name === 'cost' ? 'Monthly Cost' : 'Efficiency Score'
                ]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar yAxisId="left" dataKey="consumption" fill="#3498db" />
              <Bar yAxisId="left" dataKey="cost" fill="#e74c3c" />
              <Bar yAxisId="right" dataKey="efficiency" fill="#27ae60" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Findings */}
      <div className="report-section">
        <h2>Key Findings & Recommendations</h2>
        <div className="findings-grid">
          <div className="finding-card positive">
            <div className="finding-icon">✅</div>
            <div className="finding-content">
              <h3>Energy Efficiency Improvement</h3>
              <p>Campus-wide energy efficiency has improved by 2.3% compared to the previous period, primarily due to HVAC optimization and LED lighting upgrades.</p>
            </div>
          </div>
          
          <div className="finding-card warning">
            <div className="finding-icon">⚠️</div>
            <div className="finding-content">
              <h3>High Consumption in Engineering</h3>
              <p>The Engineering department shows 15% higher consumption than average. Recommend equipment audit and implementation of smart scheduling systems.</p>
            </div>
          </div>
          
          <div className="finding-card info">
            <div className="finding-icon">💡</div>
            <div className="finding-content">
              <h3>Peak Hour Optimization Opportunity</h3>
              <p>Analysis shows potential for 8-12% cost savings through peak hour load shifting and demand response program participation.</p>
            </div>
          </div>
          
          <div className="finding-card success">
            <div className="finding-icon">🎯</div>
            <div className="finding-content">
              <h3>Carbon Footprint Reduction</h3>
              <p>Successfully reduced carbon emissions by 7.1% through renewable energy integration and efficiency improvements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="report-section">
        <h2>Detailed Data</h2>
        <div className="data-table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Consumption (kWh)</th>
                <th>Monthly Cost ($)</th>
                <th>Efficiency Score (%)</th>
                <th>Change vs Previous</th>
              </tr>
            </thead>
            <tbody>
              {data.departments.map((dept, index) => (
                <tr key={index}>
                  <td>
                    <div className="dept-cell">
                      <strong>{dept.name}</strong>
                      <span className="dept-code">{dept.code}</span>
                    </div>
                  </td>
                  <td>{dept.totalConsumption.toLocaleString()}</td>
                  <td>${dept.monthlyCost.toLocaleString()}</td>
                  <td>
                    <span className={`efficiency-badge ${dept.efficiencyScore >= 80 ? 'high' : dept.efficiencyScore >= 60 ? 'medium' : 'low'}`}>
                      {dept.efficiencyScore}%
                    </span>
                  </td>
                  <td>
                    <span className={dept.trend > 0 ? 'trend-up' : 'trend-down'}>
                      {dept.trend > 0 ? '↑' : '↓'} {Math.abs(dept.trend).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="report-footer">
        <div className="footer-info">
          <p>This report was automatically generated by the EcoMeter Energy Management System.</p>
          <p>For questions or additional analysis, contact the Facilities Management team.</p>
        </div>
        <div className="footer-metadata">
          <span>Report ID: ECO-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          <span>Generated: {new Date().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;