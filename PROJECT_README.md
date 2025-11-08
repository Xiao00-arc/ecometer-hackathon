# 🌱 EcoMeter - Smart Campus Energy Management

A hackathon prototype for university campus carbon footprint tracking and energy optimization.

## 🎯 Features

- **Real-time Dashboard** - Energy consumption tracking across departments
- **Analytics & Charts** - Visual energy usage patterns and trends  
- **AI Recommendations** - Automated energy-saving suggestions
- **Department Management** - Individual building monitoring
- **Professional UI** - Multi-page responsive interface

## 🏗️ Architecture

- **Frontend:** React.js with React Router & Recharts
- **Backend:** Spring Boot with JPA/Hibernate
- **Database:** MySQL with sample test data
- **Deployment:** Vercel (Frontend) + Railway (Backend)

## 🚀 Live Demo

- **Frontend:** [Coming Soon - After Deployment]
- **API:** [Coming Soon - After Deployment]

## 📊 Sample Data Included

- 5 Departments (CSE, VLSI, Admin, Library, Cafeteria)
- 12 Energy readings (Electricity, Heating, Cooling, Transport, Waste)
- 6 AI-powered energy saving suggestions

## 🛠️ Local Development

### Prerequisites
- Node.js 16+
- Java 21
- MySQL 8.0

### Quick Start
```bash
# Backend
cd ecometer
./mvnw spring-boot:run

# Frontend  
cd frontend
npm install
npm start
```

## 🌐 Deployment

This project auto-deploys via GitHub integration:
- **Push to main** → Automatic deployment
- **Railway** handles backend + database
- **Vercel** handles frontend hosting

## 👥 Team

Built for 36-hour hackathon - Smart campus sustainability solution.

---

### 📁 Project Structure
```
Project ECO/
├── ecometer/          # Spring Boot Backend
├── frontend/          # React Frontend  
├── database_schema.sql # DB setup
└── README.md         # This file
```