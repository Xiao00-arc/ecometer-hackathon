import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiBarChart2, 
  FiGrid, 
  FiFileText, 
  FiSettings, 
  FiZap,
  FiMenu, 
  FiX,
  FiBell,
  FiSearch,
  FiUser,
  FiChevronDown
} from 'react-icons/fi';

// Import page components (we'll create these)
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

const navigation = [
  { name: 'Dashboard', href: '/', icon: FiHome },
  { name: 'Analytics', href: '/analytics', icon: FiBarChart2 },
  { name: 'Departments', href: '/departments', icon: FiGrid },
  { name: 'Reports', href: '/reports', icon: FiFileText },
  { name: 'Settings', href: '/settings', icon: FiSettings },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {/* Mobile sidebar */}
        <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="mobile-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
          <div className="mobile-sidebar-content">
            <div className="mobile-sidebar-header">
              <div className="logo">
                  <FiZap className="logo-icon" size={20} />
                <span className="logo-text">EcoMeter</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="close-sidebar">
                <FiX size={24} />
              </button>
            </div>
            <MobileNavigation />
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="desktop-sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <FiZap className="logo-icon" size={20} />
              <span className="logo-text">EcoMeter</span>
            </div>
            <div className="logo-subtitle">Smart Campus Energy</div>
          </div>
          <Navigation />
          <div className="sidebar-footer">
            <div className="user-profile">
              <div className="user-avatar">
                <FiUser size={16} />
              </div>
              <div className="user-info">
                <div className="user-name">Admin User</div>
                <div className="user-role">System Administrator</div>
              </div>
              <FiChevronDown size={16} className="user-dropdown" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="main-content">
          {/* Top header */}
          <header className="top-header">
            <div className="header-left">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="mobile-menu-btn"
              >
                <FiMenu size={24} />
              </button>
              <PageTitle />
            </div>
            
            <div className="header-center">
              <div className="search-bar">
                <FiSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search departments, metrics..." 
                  className="search-input"
                />
              </div>
            </div>

            <div className="header-right">
              <button className="notification-btn">
                <FiBell size={20} />
                <span className="notification-badge">3</span>
              </button>
              <div className="header-user">
                <div className="user-avatar">
                  <FiUser size={16} />
                </div>
                <span className="user-name">Admin</span>
                <FiChevronDown size={14} />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="page-content">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <li key={item.name} className="nav-item">
              <Link 
                to={item.href} 
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="nav-icon" size={20} />
                <span className="nav-text">{item.name}</span>
                {isActive && <div className="active-indicator" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileNavigation() {
  const location = useLocation();

  return (
    <nav className="mobile-navigation">
      <ul className="mobile-nav-list">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <li key={item.name} className="mobile-nav-item">
              <Link 
                to={item.href} 
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="mobile-nav-icon" size={20} />
                <span className="mobile-nav-text">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function PageTitle() {
  const location = useLocation();
  const currentPage = navigation.find(item => item.href === location.pathname);
  
  return (
    <div className="page-title">
      <h1>{currentPage?.name || 'Dashboard'}</h1>
      <div className="breadcrumb">
        <span>EcoMeter</span>
        <span className="breadcrumb-separator">/</span>
        <span>{currentPage?.name || 'Dashboard'}</span>
      </div>
    </div>
  );
}

export default App;
