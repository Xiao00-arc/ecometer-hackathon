# EcoMeter Hackathon Prototype - Quick Setup Guide

## 🚀 Complete Full-Stack Setup (36-hour Hackathon Ready!)

### Prerequisites
- ✅ MySQL Server running on localhost:3306
- ✅ Java 17+ installed
- ✅ Node.js 16+ installed
- ✅ Maven installed (or use included mvnw)

### 1. Database Setup (5 minutes)
```sql
-- Connect to MySQL and run:
CREATE DATABASE IF NOT EXISTS ECO_DB;
USE ECO_DB;

-- Run the complete schema from database_schema.sql
-- This includes tables + sample data for immediate testing
```

### 2. Backend Setup (Spring Boot)
```bash
# Navigate to backend folder
cd ecometer

# Update MySQL credentials in application.properties if needed
# Current settings: username=root, password=root

# Run Spring Boot application
./mvnw spring-boot:run
# Or on Windows: mvnw.cmd spring-boot:run

# Server will start on http://localhost:8080
```

### 3. Frontend Setup (React)
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start React development server
npm start

# Frontend will start on http://localhost:3000
```

### 4. Test the Application

#### Backend API Endpoints:
- **GET** http://localhost:8080/api/dashboard-data
- **GET** http://localhost:8080/api/suggestions
- **POST** http://localhost:8080/api/data
- **GET** http://localhost:8080/api/departments

#### Frontend Features:
- 🌍 **Carbon Footprint Dashboard** - Real-time metrics
- 📊 **Department Comparisons** - Interactive bar charts
- 🤖 **AI Recommendations** - Smart energy suggestions
- 📱 **Responsive Design** - Mobile-friendly interface

### 5. Demo Data Available
The database comes pre-loaded with:
- 5 University departments (CSE, VLSI, Admin, Library, Cafeteria)
- 24 hours of simulated IoT energy data
- 6 AI-generated sustainability suggestions

### 6. Simulate IoT Data (for Demo)
```bash
# POST new energy data to the API
curl -X POST http://localhost:8080/api/data \
  -H "Content-Type: application/json" \
  -d '{
    "departmentId": 1,
    "kwhUsed": 125.5,
    "sourceType": "ELECTRICITY"
  }'
```

## 🏆 Hackathon Demo Script (2-minute pitch)

1. **Problem Statement** (30s)
   - "Universities waste $2.3B annually on energy costs"
   - "No real-time visibility into carbon footprint"

2. **Solution Demo** (60s)
   - Open dashboard → Show live carbon metrics
   - Navigate department comparison → Highlight efficiency gaps
   - Review AI suggestions → Demonstrate ROI potential

3. **Technical Achievement** (30s)
   - "Full-stack prototype in 36 hours"
   - "Ready for IoT sensor integration"
   - "Scalable Spring Boot + React architecture"

## 🛠 Tech Stack Implemented
- **Backend**: Spring Boot 3.5.7, MySQL 8.0, JPA/Hibernate
- **Frontend**: React 19.2.0, Chart.js, Axios
- **Database**: MySQL with optimized queries and indexes
- **Styling**: Custom CSS with glassmorphism design

## 📊 Key Metrics for Judges
- **3 REST API endpoints** fully functional
- **4 React components** with real-time data
- **Database schema** with 3 tables + relationships
- **Responsive design** works on mobile/desktop
- **Auto-refresh** dashboard every 30 seconds
- **Error handling** throughout the application

## 🚨 Troubleshooting
- **Database connection error**: Check MySQL is running and credentials match
- **CORS errors**: Ensure frontend runs on localhost:3000
- **API not responding**: Verify Spring Boot started successfully on port 8080
- **Charts not loading**: Run `npm install` to ensure chart.js dependencies

## 🎯 Future Enhancements (Post-Hackathon)
- Real IoT sensor integration (Arduino/Raspberry Pi)
- Machine learning for predictive analytics
- Multi-campus support with role-based access
- Advanced reporting and export features
- Mobile app for facility managers

---
**Built with ❤️ for EcoMeter Hackathon 2025**