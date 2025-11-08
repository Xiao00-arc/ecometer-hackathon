# Render Deployment Configuration

## Backend Service (Render)
- **Service Type:** Web Service
- **Name:** ecometer-backend  
- **Root Directory:** ecometer
- **Build Command:** ./mvnw clean package -DskipTests
- **Start Command:** java -Dserver.port=$PORT -jar target/ecometer-0.0.1-SNAPSHOT.jar

## Environment Variables:
```
SPRING_PROFILES_ACTIVE=prod
```

## Database (Render PostgreSQL)
Render will automatically provide:
- DATABASE_URL (automatically injected)
- Free PostgreSQL database (up to 1GB)

## Expected URLs:
- Backend: https://ecometer-backend.onrender.com
- Database: Managed by Render