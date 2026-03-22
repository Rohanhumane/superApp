@echo off
echo ============================================
echo   SK Finance Sevak - Monorepo Setup Script
echo   For Windows
echo ============================================
echo.

:: Check if we're in the right place
if not exist "packages" (
    echo ERROR: Run this script from inside the extracted nbfc-super-app folder!
    echo Example: cd D:\RohanApp\temp\nbfc-super-app
    echo          setup-windows.bat D:\RohanApp\app
    pause
    exit /b 1
)

:: Get target directory from argument or ask
set TARGET=%~1
if "%TARGET%"=="" (
    set /p TARGET="Enter project parent folder (e.g. D:\RohanApp\app): "
)

echo.
echo [Step 1/6] Creating React Native project at %TARGET%\NBFCSuperApp...
echo This takes 2-3 minutes. Please wait...
echo.

cd /d "%TARGET%"
if exist NBFCSuperApp (
    echo Removing old NBFCSuperApp folder...
    rmdir /s /q NBFCSuperApp
)

call npx @react-native-community/cli init NBFCSuperApp --version 0.73.4
if errorlevel 1 (
    echo ERROR: React Native init failed. Make sure Node.js 18+ is installed.
    pause
    exit /b 1
)

echo.
echo [Step 2/6] Creating monorepo structure...
echo.

:: Create root monorepo wrapper
mkdir "%TARGET%\nbfc-super-app"
mkdir "%TARGET%\nbfc-super-app\apps"

:: Move RN project into apps/mobile
move "%TARGET%\NBFCSuperApp" "%TARGET%\nbfc-super-app\apps\mobile"

:: Go to the extracted zip location to copy packages
cd /d "%~dp0"

:: Copy packages folder to monorepo root
xcopy /E /I /Y "packages" "%TARGET%\nbfc-super-app\packages"

:: Copy root monorepo files
copy /Y "package.json" "%TARGET%\nbfc-super-app\"
copy /Y "turbo.json" "%TARGET%\nbfc-super-app\"
copy /Y "tsconfig.base.json" "%TARGET%\nbfc-super-app\"
copy /Y "README.md" "%TARGET%\nbfc-super-app\"

echo.
echo [Step 3/6] Copying app source code into apps/mobile...
echo.

:: Copy our source into the RN project
xcopy /E /I /Y "apps\mobile\src" "%TARGET%\nbfc-super-app\apps\mobile\src"

:: Overwrite config files
copy /Y "apps\mobile\App.tsx" "%TARGET%\nbfc-super-app\apps\mobile\"
copy /Y "apps\mobile\index.js" "%TARGET%\nbfc-super-app\apps\mobile\"
copy /Y "apps\mobile\babel.config.js" "%TARGET%\nbfc-super-app\apps\mobile\"
copy /Y "apps\mobile\metro.config.js" "%TARGET%\nbfc-super-app\apps\mobile\"
copy /Y "apps\mobile\tsconfig.json" "%TARGET%\nbfc-super-app\apps\mobile\"

echo.
echo [Step 4/6] Installing dependencies...
echo.

cd /d "%TARGET%\nbfc-super-app\apps\mobile"

call npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated @reduxjs/toolkit react-redux @react-native-async-storage/async-storage axios i18next react-i18next

call npm install -D babel-plugin-module-resolver

echo.
echo [Step 5/6] Cleaning Android build...
echo.

cd android
call gradlew clean
cd ..

echo.
echo [Step 6/6] Setup complete!
echo.
echo ============================================
echo   YOUR MONOREPO IS READY!
echo ============================================
echo.
echo   Location: %TARGET%\nbfc-super-app
echo.
echo   To run the app:
echo.
echo   1. Open Terminal 1:
echo      cd %TARGET%\nbfc-super-app\apps\mobile
echo      npx react-native start --reset-cache
echo.
echo   2. Open Terminal 2:
echo      cd %TARGET%\nbfc-super-app\apps\mobile
echo      npx react-native run-android
echo.
echo   Demo MPIN: 3635
echo ============================================
echo.
pause
