# EcoMeter - Setup Guide for Demo

## 🚀 Quick Start (For Demo Partner)

### Prerequisites
- **Node.js** (v16+): Download from https://nodejs.org/
- **Java 21**: Download from https://adoptium.net/
- **MySQL 8.0**: Download from https://dev.mysql.com/downloads/installer/

### 📁 Project Structure
```
Project ECO/
├── ecometer/          # Spring Boot Backend
├── frontend/          # React Frontend  
├── database_schema.sql # Database setup
└── SETUP_GUIDE.md     # This file
```

### ⚡ Quick Setup Steps

#### 1. Database Setup
```sql
-- In MySQL Workbench or Command Line:
CREATE DATABASE ECO_DB;
-- Then run: database_schema.sql (optional - Spring Boot auto-creates)
```

#### 2. Backend Setup
```bash
cd ecometer
./mvnw spring-boot:run
# Backend will run on: http://localhost:8081
```

#### 3. Frontend Setup  
```bash
cd frontend
npm install
npm start
# Frontend will run on: http://localhost:3000
```

#### 4. Access the App
Open: http://localhost:3000

### 🔧 Configuration

**MySQL Connection (ecometer/src/main/resources/application.properties):**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ECO_DB
spring.datasource.username=root
spring.datasource.password=root  # Change to your MySQL password
```

### 📊 Test Data
- **Automatic**: Spring Boot loads test data automatically
- **Manual**: Run `database_schema.sql` if needed

### 🎯 Demo Features
- Dashboard with real-time energy metrics
- Analytics charts (Recharts integration)
- Department management
- AI-powered recommendations
- Professional multi-page interface

### 🚨 Troubleshooting

**Port 8081 already in use?**
```bash
# Kill existing process or change port in application.properties
server.port=8082
```

**Frontend API connection issues?**
- Check backend is running on port 8081
- Verify CORS settings in WebConfig.java

**Database connection failed?**
- Ensure MySQL is running
- Check username/password in application.properties
- Create ECO_DB database manually

### 📞 Support
Contact: [Your Name] for any setup issues!