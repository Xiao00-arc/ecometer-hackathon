import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './DepartmentScorecard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DepartmentScorecard = ({ departments }) => {
  // Prepare chart data
  const chartData = {
    labels: departments?.map(dept => dept.departmentName) || [],
    datasets: [
      {
        label: 'Energy Usage (kWh)',
        data: departments?.map(dept => parseFloat(dept.totalKwh) || 0) || [],
        backgroundColor: 'rgba(52, 152, 219, 0.8)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Carbon Footprint (kg CO₂)',
        data: departments?.map(dept => parseFloat(dept.totalCarbonKg) || 0) || [],
        backgroundColor: 'rgba(231, 76, 60, 0.8)',
        borderColor: 'rgba(231, 76, 60, 1)',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Segoe UI',
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Department Energy & Carbon Comparison',
        font: {
          family: 'Segoe UI',
          size: 16,
          weight: 'bold'
        },
        color: '#2c3e50'
      },
      tooltip: {
        backgroundColor: 'rgba(44, 62, 80, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3498db',
        borderWidth: 1,
        cornerRadius: 6,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2);
              label += context.dataset.label.includes('Carbon') ? ' kg CO₂' : ' kWh';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Segoe UI',
            size: 11
          },
          color: '#7f8c8d'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            family: 'Segoe UI',
            size: 11
          },
          color: '#7f8c8d'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  // Calculate totals and rankings
  const departmentStats = departments?.map(dept => ({
    ...dept,
    efficiency: dept.totalKwh > 0 ? (dept.totalCarbonKg / dept.totalKwh).toFixed(3) : 0
  })) || [];

  const sortedByEfficiency = [...departmentStats].sort((a, b) => parseFloat(a.efficiency) - parseFloat(b.efficiency));
  const mostEfficient = sortedByEfficiency[0];
  const leastEfficient = sortedByEfficiency[sortedByEfficiency.length - 1];

  return (
    <div className="department-scorecard">
      <div className="scorecard-header">
        <h2>Department Performance</h2>
        <div className="stats-summary">
          <span className="total-departments">
            {departments?.length || 0} Departments Monitored
          </span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        {departments && departments.length > 0 ? (
          <div className="chart-wrapper">
            <Bar data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div className="no-data">
            <div className="no-data-icon">📊</div>
            <p>No department data available</p>
            <small>Waiting for energy data...</small>
          </div>
        )}
      </div>

      {/* Department List */}
      <div className="department-list">
        <h3>Department Details</h3>
        {departments && departments.length > 0 ? (
          <div className="department-cards">
            {departments.map((dept, index) => (
              <div key={index} className="department-card">
                <div className="dept-header">
                  <h4>{dept.departmentName}</h4>
                  <div className={`efficiency-badge ${
                    dept === mostEfficient ? 'best' : 
                    dept === leastEfficient ? 'worst' : 'neutral'
                  }`}>
                    {dept === mostEfficient && '🏆 Most Efficient'}
                    {dept === leastEfficient && '⚠️ Needs Attention'}
                    {dept !== mostEfficient && dept !== leastEfficient && '✓ Normal'}
                  </div>
                </div>
                
                <div className="dept-metrics">
                  <div className="metric">
                    <span className="metric-label">Energy</span>
                    <span className="metric-value">
                      {parseFloat(dept.totalKwh).toFixed(1)} kWh
                    </span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Carbon</span>
                    <span className="metric-value">
                      {parseFloat(dept.totalCarbonKg).toFixed(2)} kg
                    </span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Cost</span>
                    <span className="metric-value">
                      ${parseFloat(dept.totalCostUsd).toFixed(2)}
                    </span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Efficiency</span>
                    <span className="metric-value">
                      {departmentStats[index]?.efficiency} kg/kWh
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No departments found. Check your data connection.</p>
          </div>
        )}
      </div>

      {/* Quick Insights */}
      {mostEfficient && leastEfficient && (
        <div className="insights-section">
          <h3>Quick Insights</h3>
          <div className="insight-cards">
            <div className="insight-card positive">
              <div className="insight-icon">🌟</div>
              <div className="insight-content">
                <h4>Best Performer</h4>
                <p><strong>{mostEfficient.departmentName}</strong> has the lowest carbon intensity at {mostEfficient.efficiency} kg CO₂/kWh</p>
              </div>
            </div>
            <div className="insight-card warning">
              <div className="insight-icon">⚡</div>
              <div className="insight-content">
                <h4>Improvement Opportunity</h4>
                <p><strong>{leastEfficient.departmentName}</strong> could reduce emissions by adopting {mostEfficient.departmentName}'s practices</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentScorecard;