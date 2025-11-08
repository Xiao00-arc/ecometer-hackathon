# EcoMeter Database Setup Instructions

## Step 1: Create the Database

You need to create the MySQL database first. Here are two options:

### Option A: Using MySQL Command Line
```sql
-- Connect to MySQL as root user
mysql -u root -p

-- Create the database
CREATE DATABASE ecometer_db;

-- Verify it was created
SHOW DATABASES;

-- Exit MySQL
EXIT;
```

### Option B: Using MySQL Workbench or phpMyAdmin
1. Open MySQL Workbench or phpMyAdmin
2. Connect with username: `root` and password: `root`
3. Create a new database called `ecometer_db`

## Step 2: Run the Database Schema (Optional)
After creating the database, you can optionally run our schema file:
```sql
-- Use the database
USE ecometer_db;

-- Run the contents of database_schema.sql file
-- (Copy and paste the content from database_schema.sql)
```

## Step 3: Start Spring Boot
Once the database exists, Spring Boot will automatically:
- Connect to the database
- Create all tables using JPA entities (because of `spring.jpa.hibernate.ddl-auto=update`)
- You can then run the sample data from database_schema.sql if needed

## Quick Command for Windows PowerShell:
```powershell
# If MySQL is in your PATH
mysql -u root -p -e "CREATE DATABASE ecometer_db;"
```