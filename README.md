# EcoMeter - Smart Campus Energy Management System

A comprehensive energy monitoring dashboard for smart campus management, built with React and Spring Boot.

## 🚀 Quick Start Guide for Friends

### Prerequisites
- **Java 17 or higher** (for Spring Boot backend)
- **Node.js 16+ and npm** (for React frontend)
- **MySQL 8.0+** (for database)
- **Git** (to clone the repository)

### 1. Clone the Repository
```bash
git clone https://github.com/Xiao00-arc/ecometer-hackathon.git
cd ecometer-hackathon
```

### 2. Database Setup
1. **Install MySQL** if not already installed
2. **Create a database** named `ECO_DB`:
   ```sql
   CREATE DATABASE ECO_DB;
   ```
3. **Create a MySQL user** (optional but recommended):
   ```sql
   CREATE USER 'ecometer_user'@'localhost' IDENTIFIED BY 'password123';
   GRANT ALL PRIVILEGES ON ECO_DB.* TO 'ecometer_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 3. Backend Setup (Spring Boot)
1. **Navigate to backend directory**:
   ```bash
   cd ecometer
   ```

2. **Update database configuration** in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ECO_DB
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```

3. **Start the backend server**:
   ```bash
   # On Windows
   .\mvnw.cmd spring-boot:run
   
   # On Mac/Linux
   ./mvnw spring-boot:run
   ```
   
   The backend will start on `http://localhost:8081`

### 4. Frontend Setup (React)
1. **Open a new terminal** and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend**:
   ```bash
   npm start
   ```
   
   The frontend will start on `http://localhost:3000`

### 5. Load Test Data
Once both servers are running, you can load sample data in two ways:

#### Option A: Using the API (Recommended)
Open your browser and navigate to:
```
http://localhost:8081/api/initialize-test-data
```
Or use curl:
```bash
curl -X POST http://localhost:8081/api/initialize-test-data
```

#### Option B: Using Frontend (Coming Soon)
A data initialization button will be available in the Settings page.

## 📊 Features
- **Dashboard**: Real-time energy consumption overview
- **Analytics**: Detailed energy consumption charts and trends
- **Departments**: Department-wise energy monitoring
- **Reports**: Comprehensive energy reports
- **Settings**: System configuration options
- **AI Suggestions**: Smart energy-saving recommendations

## 🏗️ Architecture
- **Frontend**: React 18 with React Router, Recharts, React Icons
- **Backend**: Spring Boot 3.5.7 with JPA/Hibernate
- **Database**: MySQL 8.0 with automatic schema generation
- **API**: RESTful services with CORS enabled

## 📡 API Endpoints
- `GET /api/departments` - Get all departments
- `GET /api/energy` - Get energy consumption data
- `GET /api/ai-suggestions` - Get AI recommendations
- `POST /api/initialize-test-data` - Load sample data
- `POST /api/reset-and-initialize` - Reset and reload data
- `GET /api/data-status` - Check data status

## 💡 Sample Data Included
The system includes realistic test data:
- **5 Departments**: CSE, VLSI Lab, Admin Office, Library, Cafeteria
- **12 Energy Readings**: Hourly consumption data
- **6 AI Suggestions**: Energy optimization recommendations

## 🛠️ Troubleshooting

### Backend Issues
- **Port 8081 already in use**: Change the port in `application.properties`:
  ```properties
  server.port=8082
  ```
  Don't forget to update the frontend API URL accordingly.

- **MySQL connection failed**: 
  - Verify MySQL is running
  - Check username/password in `application.properties`
  - Ensure the database `ECO_DB` exists

### Frontend Issues
- **Port 3000 already in use**: The React dev server will prompt to use a different port
- **API connection failed**: Ensure the backend is running on port 8081

### No Data Showing
- Use the test data initialization endpoint: `POST /api/initialize-test-data`
- Check if data exists: `GET /api/data-status`

## � Development
To modify or extend the system:
1. Backend code is in `ecometer/src/main/java/com/example/ecometer/`
2. Frontend code is in `frontend/src/`
3. Test data is in `ecometer/src/main/resources/test-data.json`

## � Support
If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify both frontend and backend are running
4. Check browser console for frontend errors
5. Check terminal output for backend errors

## 🎯 Demo URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8081/api
- **Test Data**: http://localhost:8081/api/initialize-test-data

Happy monitoring! 🌱⚡