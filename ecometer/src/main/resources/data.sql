-- Insert sample departments for testing
INSERT IGNORE INTO departments (name, description, total_area_sqft) VALUES
('CSE', 'Computer Science & Engineering Department', 15000.00),
('VLSI', 'Very Large Scale Integration Department', 8000.00),
('Admin', 'Administrative Building', 12000.00),
('Library', 'Central Library', 20000.00),
('Cafeteria', 'Student Dining Hall', 5000.00);

-- Insert sample AI suggestions for testing
INSERT IGNORE INTO ai_suggestions (suggestion_text, category, priority, estimated_savings_usd) VALUES
('Switch to LED lighting in CSE building to reduce electricity consumption by 30%', 'energy_saving', 'high', 2400.00),
('Install smart thermostats in Admin building to optimize heating/cooling cycles', 'cost_reduction', 'medium', 1800.00),
('Implement motion sensors in Library to automatically turn off lights in unused areas', 'energy_saving', 'medium', 1200.00),
('Upgrade HVAC system in VLSI department - current system is 40% less efficient', 'maintenance', 'high', 5000.00),
('Install solar panels on Cafeteria roof to offset 60% of electricity usage', 'sustainability', 'high', 8000.00),
('Schedule equipment maintenance in CSE lab to improve energy efficiency', 'maintenance', 'low', 600.00);

-- Insert sample energy data for testing (last 24 hours)
INSERT IGNORE INTO energy_data (department_id, kwh_used, source_type, cost_usd, carbon_kg, timestamp) VALUES
-- CSE Department
(1, 150.5, 'ELECTRICITY', 18.06, 67.73, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(1, 25.3, 'COOLING', 3.04, 11.39, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(1, 45.2, 'TRANSPORT', 5.42, 20.34, DATE_SUB(NOW(), INTERVAL 3 HOUR)),

-- VLSI Department  
(2, 89.7, 'ELECTRICITY', 10.76, 40.37, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(2, 15.8, 'COOLING', 1.90, 7.11, DATE_SUB(NOW(), INTERVAL 2 HOUR)),

-- Admin Building
(3, 67.4, 'ELECTRICITY', 8.09, 30.33, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(3, 12.1, 'HEATING', 1.45, 5.45, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(3, 8.5, 'TRANSPORT', 1.02, 3.83, DATE_SUB(NOW(), INTERVAL 4 HOUR)),

-- Library
(4, 125.9, 'ELECTRICITY', 15.11, 56.66, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(4, 35.7, 'COOLING', 4.28, 16.07, DATE_SUB(NOW(), INTERVAL 2 HOUR)),

-- Cafeteria
(5, 78.3, 'ELECTRICITY', 9.40, 35.24, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(5, 22.4, 'WASTE', 2.69, 10.08, DATE_SUB(NOW(), INTERVAL 3 HOUR));