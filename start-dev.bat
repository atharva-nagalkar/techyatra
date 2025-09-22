@echo off
echo Starting TechYatra on Single Port...
echo.

REM Kill any existing process on port 4001
echo 🔄 Stopping any existing server on port 4001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4001') do taskkill /PID %%a /F >nul 2>&1

REM Build frontend first
echo 📦 Building frontend...
cd frontend
call npm run build
cd ..

REM Start single server (skip seeding since it already worked)
echo 🚀 Starting server on port 4001...
echo ✅ Frontend + Backend: http://localhost:4001
echo ✅ API endpoints: http://localhost:4001/api/...
echo ✅ Health check: http://localhost:4001/health
echo.
cd backend
node src/server.js

pause
