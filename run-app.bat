@echo off
title SK Finance Sevak - Running App
cd /d "%~dp0"

echo ============================================
echo   SK Finance Sevak - Starting Android App
echo ============================================
echo.

:: Start Metro bundler in a new window
echo Starting Metro bundler...
start "Metro Bundler" cmd /k "cd /d "%~dp0apps\mobile" && npx react-native start"

:: Wait for Metro to initialize
echo Waiting for Metro to start...
timeout /t 10 /nobreak >nul

:: Build and install on Android
echo Building and installing on Android device...
cd apps\mobile\android
call gradlew.bat app:installDebug -PreactNativeDevServerPort=8081

if %errorlevel% neq 0 (
    echo.
    echo Build failed! Check the errors above.
    pause
    exit /b 1
)

:: Launch the app on device
echo Launching app...
adb shell am start -n com.skfinance.sevak/.MainActivity

echo.
echo ============================================
echo   App launched successfully!
echo ============================================
pause
