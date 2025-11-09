import React, { useState } from 'react';
import axios from 'axios';
import './AISuggestions.css';

const AISuggestions = ({ suggestions }) => {
  const [loading, setLoading] = useState(false);
  const [localSuggestions, setLocalSuggestions] = useState(suggestions);

  // Priority icons and colors
  const getPriorityConfig = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return { icon: '🔴', color: '#e74c3c', label: 'High Priority' };
      case 'medium':
        return { icon: '🟡', color: '#f39c12', label: 'Medium Priority' };
      case 'low':
        return { icon: '🟢', color: '#27ae60', label: 'Low Priority' };
      default:
        return { icon: '⚪', color: '#95a5a6', label: 'Normal' };
    }
  };

  // Category icons
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'energy_saving':
        return '⚡';
      case 'cost_reduction':
        return '💰';
      case 'sustainability':
        return '🌱';
      case 'maintenance':
        return '🔧';
      default:
        return '💡';
    }
  };

  // Refresh suggestions from API
  const refreshSuggestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8081/api/suggestions');
      setLocalSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format category for display
  const formatCategory = (category) => {
    return category?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'General';
  };

  // Calculate total potential savings
  const totalSavings = localSuggestions?.reduce((sum, suggestion) => {
    return sum + (parseFloat(suggestion.estimatedSavingsUsd) || 0);
  }, 0) || 0;

  return (
    <div className="ai-suggestions">
      <div className="suggestions-header">
        <div className="header-content">
          <h2>
            <span className="ai-icon">🤖</span>
            AI Recommendations
          </h2>
          <button 
            onClick={refreshSuggestions}
            disabled={loading}
            className="refresh-btn"
          >
            {loading ? '⟳' : '🔄'}
          </button>
        </div>
        
        {totalSavings > 0 && (
          <div className="savings-summary">
            <span className="savings-icon">💵</span>
            <span className="savings-text">
              Potential savings: <strong>${totalSavings.toFixed(2)}</strong>
            </span>
          </div>
        )}
      </div>

      <div className="suggestions-container">
        {localSuggestions && localSuggestions.length > 0 ? (
          <div className="suggestions-list">
            {localSuggestions.map((suggestion, index) => {
              const priorityConfig = getPriorityConfig(suggestion.priority);
              const categoryIcon = getCategoryIcon(suggestion.category);
              
              return (
                <div key={suggestion.id || index} className="suggestion-card">
                  <div className="suggestion-header">
                    <div className="category-info">
                      <span className="category-icon">{categoryIcon}</span>
                      <span className="category-name">
                        {formatCategory(suggestion.category)}
                      </span>
                    </div>
                    
                    <div 
                      className="priority-badge"
                      style={{ backgroundColor: `${priorityConfig.color}15`, color: priorityConfig.color }}
                    >
                      <span className="priority-icon">{priorityConfig.icon}</span>
                      <span className="priority-text">{priorityConfig.label}</span>
                    </div>
                  </div>

                  <div className="suggestion-content">
                    <p className="suggestion-text">
                      {suggestion.suggestionText}
                    </p>
                    
                    {suggestion.estimatedSavingsUsd && (
                      <div className="savings-estimate">
                        <span className="savings-label">Estimated Savings:</span>
                        <span className="savings-amount">
                          ${parseFloat(suggestion.estimatedSavingsUsd).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="suggestion-actions">
                    <button className="action-btn primary">
                      📋 View Details
                    </button>
                    <button className="action-btn secondary">
                      ✅ Mark as Implemented
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-suggestions">
            <div className="no-suggestions-icon">🤔</div>
            <h3>No Suggestions Available</h3>
            <p>The AI is analyzing your energy data to generate personalized recommendations.</p>
            <button onClick={refreshSuggestions} className="refresh-large-btn">
              {loading ? 'Loading...' : 'Check for New Suggestions'}
            </button>
          </div>
        )}
      </div>

      {/* AI Insights Footer */}
      <div className="ai-insights-footer">
        <div className="insights-stats">
          <div className="stat-item">
            <span className="stat-icon">💡</span>
            <span className="stat-text">
              {localSuggestions?.length || 0} Active Suggestions
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <span className="stat-text">
              {localSuggestions?.filter(s => s.priority === 'HIGH').length || 0} High Priority
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📈</span>
            <span className="stat-text">
              ${totalSavings.toFixed(0)} Potential Impact
            </span>
          </div>
        </div>
        
        <div className="ai-disclaimer">
          <small>
            💬 AI recommendations are based on your energy usage patterns and industry best practices.
          </small>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;