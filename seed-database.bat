@echo off
echo Seeding Database with Sample Data...
echo.

cd backend
node src/seed.js

echo.
echo Press any key to exit...
pause >nul
