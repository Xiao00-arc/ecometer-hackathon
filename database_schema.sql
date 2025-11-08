-- EcoMeter Database Schema
-- Created for 36-hour hackathon prototype
-- Date: November 8, 2025

-- Create database (run this first if needed)
CREATE DATABASE IF NOT EXISTS ECO_DB;
USE ECO_DB;

-- 1. Departments Table
-- Stores university departments/buildings that we're tracking
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    total_area_sqft DECIMAL(10,2), -- Area in square feet for carbon calculations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Energy Data Table
-- Stores all energy consumption data from IoT sensors (simulated in prototype)
CREATE TABLE energy_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    kwh_used DECIMAL(10,2) NOT NULL,
    source_type ENUM('electricity', 'transport', 'waste', 'heating', 'cooling') NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cost_usd DECIMAL(8,2), -- Cost in USD for financial tracking
    carbon_kg DECIMAL(10,3), -- Carbon footprint in kg CO2
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
    INDEX idx_department_timestamp (department_id, timestamp),
    INDEX idx_source_type (source_type),
    INDEX idx_timestamp (timestamp)
);

-- 3. AI Suggestions Table
-- Stores AI-generated suggestions for energy savings (simulated in prototype)
CREATE TABLE ai_suggestions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    suggestion_text TEXT NOT NULL,
    category ENUM('energy_saving', 'cost_reduction', 'sustainability', 'maintenance') NOT NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    estimated_savings_usd DECIMAL(8,2), -- Estimated financial savings
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample departments for testing
INSERT INTO departments (name, description, total_area_sqft) VALUES
('CSE', 'Computer Science & Engineering Department', 15000.00),
('VLSI', 'Very Large Scale Integration Department', 8000.00),
('Admin', 'Administrative Building', 12000.00),
('Library', 'Central Library', 20000.00),
('Cafeteria', 'Student Dining Hall', 5000.00);

-- Insert sample AI suggestions for testing
INSERT INTO ai_suggestions (suggestion_text, category, priority, estimated_savings_usd) VALUES
('Switch to LED lighting in CSE building to reduce electricity consumption by 30%', 'energy_saving', 'high', 2400.00),
('Install smart thermostats in Admin building to optimize heating/cooling cycles', 'cost_reduction', 'medium', 1800.00),
('Implement motion sensors in Library to automatically turn off lights in unused areas', 'energy_saving', 'medium', 1200.00),
('Upgrade HVAC system in VLSI department - current system is 40% less efficient', 'maintenance', 'high', 5000.00),
('Install solar panels on Cafeteria roof to offset 60% of electricity usage', 'sustainability', 'high', 8000.00),
('Schedule equipment maintenance in CSE lab to improve energy efficiency', 'maintenance', 'low', 600.00);

-- Insert sample energy data for testing (last 24 hours)
INSERT INTO energy_data (department_id, kwh_used, source_type, cost_usd, carbon_kg, timestamp) VALUES
-- CSE Department
(1, 150.5, 'electricity', 18.06, 67.73, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(1, 25.3, 'cooling', 3.04, 11.39, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(1, 45.2, 'transport', 5.42, 20.34, DATE_SUB(NOW(), INTERVAL 3 HOUR)),

-- VLSI Department  
(2, 89.7, 'electricity', 10.76, 40.37, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(2, 15.8, 'cooling', 1.90, 7.11, DATE_SUB(NOW(), INTERVAL 2 HOUR)),

-- Admin Building
(3, 67.4, 'electricity', 8.09, 30.33, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(3, 12.1, 'heating', 1.45, 5.45, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(3, 8.5, 'transport', 1.02, 3.83, DATE_SUB(NOW(), INTERVAL 4 HOUR)),

-- Library
(4, 125.9, 'electricity', 15.11, 56.66, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(4, 35.7, 'cooling', 4.28, 16.07, DATE_SUB(NOW(), INTERVAL 2 HOUR)),

-- Cafeteria
(5, 78.3, 'electricity', 9.40, 35.24, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(5, 22.4, 'waste', 2.69, 10.08, DATE_SUB(NOW(), INTERVAL 3 HOUR));

-- Create views for common dashboard queries (optional but helpful)

-- View: Daily energy summary by department
CREATE VIEW daily_energy_summary AS
SELECT 
    d.name as department_name,
    DATE(e.timestamp) as date,
    SUM(e.kwh_used) as total_kwh,
    SUM(e.cost_usd) as total_cost,
    SUM(e.carbon_kg) as total_carbon_kg,
    COUNT(*) as reading_count
FROM departments d
JOIN energy_data e ON d.id = e.department_id
WHERE e.timestamp >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY d.id, d.name, DATE(e.timestamp)
ORDER BY date DESC, total_kwh DESC;

-- View: Current carbon footprint by source type
CREATE VIEW carbon_by_source AS
SELECT 
    source_type,
    SUM(kwh_used) as total_kwh,
    SUM(carbon_kg) as total_carbon_kg,
    AVG(carbon_kg) as avg_carbon_kg,
    COUNT(*) as reading_count
FROM energy_data
WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
GROUP BY source_type
ORDER BY total_carbon_kg DESC;