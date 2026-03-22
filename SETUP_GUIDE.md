# SK Finance Sevak — Complete Setup Guide

## Prerequisites (Install these first if not already installed)

### 1. Node.js (v18+)
```bash
# Check if installed
node -v

# If not installed, download from https://nodejs.org
# Or use nvm:
nvm install 18
nvm use 18
```

### 2. Java JDK 17
```bash
# Check if installed
java -version

# If not installed:
# Windows: Download from https://adoptium.net/
# Mac: brew install openjdk@17
# Linux: sudo apt install openjdk-17-jdk
```

### 3. Android Studio
- Download from https://developer.android.com/studio
- During install, make sure these are checked:
  - Android SDK
  - Android SDK Platform 34
  - Android Virtual Device (AVD)
  - Intel HAXM (for emulator)

### 4. Set Environment Variables
```bash
# Add to ~/.bashrc or ~/.zshrc (Mac/Linux)
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

# Windows: Set in System Environment Variables
# ANDROID_HOME = C:\Users\YourName\AppData\Local\Android\Sdk

# Reload terminal
source ~/.bashrc   # or source ~/.zshrc
```

### 5. Yarn (v1)
```bash
npm install -g yarn
yarn -v   # Should show 1.x.x
```

---

## Step-by-Step Setup

### Step 1: Create a fresh React Native project
```bash
# Navigate to where you want the project
cd ~/Desktop

# Create fresh RN project (this generates android/ and ios/ folders)
npx react-native@0.73.4 init NBFCSuperApp --version 0.73.4

# Enter the project
cd NBFCSuperApp
```

### Step 2: Extract the monorepo zip
```bash
# Unzip the downloaded file (adjust path to where you downloaded it)
# On Mac/Linux:
unzip ~/Downloads/nbfc-super-app-monorepo.zip -d ~/Desktop/temp-nbfc

# On Windows (PowerShell):
# Expand-Archive -Path "$HOME\Downloads\nbfc-super-app-monorepo.zip" -DestinationPath "$HOME\Desktop\temp-nbfc"
```

### Step 3: Copy monorepo structure into the RN project
```bash
# From inside NBFCSuperApp directory:
cd ~/Desktop/NBFCSuperApp

# Copy the packages folder (the NPM modules)
cp -r ~/Desktop/temp-nbfc/nbfc-super-app/packages ./

# Copy the app source code
cp -r ~/Desktop/temp-nbfc/nbfc-super-app/apps/mobile/src ./

# Copy app entry files (overwrite existing)
cp ~/Desktop/temp-nbfc/nbfc-super-app/apps/mobile/App.tsx ./
cp ~/Desktop/temp-nbfc/nbfc-super-app/apps/mobile/index.js ./

# Copy configs (overwrite existing)
cp ~/Desktop/temp-nbfc/nbfc-super-app/apps/mobile/babel.config.js ./
cp ~/Desktop/temp-nbfc/nbfc-super-app/apps/mobile/metro.config.js ./
cp ~/Desktop/temp-nbfc/nbfc-super-app/apps/mobile/tsconfig.json ./

# Copy root monorepo files
cp ~/Desktop/temp-nbfc/nbfc-super-app/turbo.json ./
cp ~/Desktop/temp-nbfc/nbfc-super-app/README.md ./
```

### Step 4: Update package.json with all dependencies
```bash
# Install navigation
yarn add @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs

# Install navigation dependencies
yarn add react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated

# Install state management
yarn add @reduxjs/toolkit react-redux @react-native-async-storage/async-storage

# Install networking
yarn add axios

# Install i18n
yarn add i18next react-i18next

# Install utils
yarn add react-native-keychain react-native-device-info react-native-image-picker

# Install dev dependencies
yarn add -D babel-plugin-module-resolver @types/react @types/react-native
```

### Step 5: Fix metro.config.js for monorepo packages
```bash
# The metro.config.js we copied should already handle this.
# But verify it exists:
cat metro.config.js
```

It should look like:
```javascript
const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  watchFolders: [path.resolve(__dirname, 'packages')],
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
    ],
  },
};
module.exports = mergeConfig(defaultConfig, config);
```

### Step 6: Configure react-native-reanimated
```bash
# Open babel.config.js and make sure reanimated plugin is LAST:
cat babel.config.js
```

Verify it has `'react-native-reanimated/plugin'` as the last plugin.

### Step 7: Android-specific setup

```bash
# Navigate to android folder
cd android

# Add to android/app/build.gradle (inside defaultConfig block):
# Make sure minSdkVersion is 24 or higher

# Clean build
./gradlew clean

# Go back
cd ..
```

### Step 8: Create Android Emulator (if not already done)
```bash
# Open Android Studio → Virtual Device Manager → Create Device
# Choose: Pixel 6 → System Image: API 34 → Finish

# OR create via command line:
sdkmanager "system-images;android-34;google_apis;x86_64"
avdmanager create avd -n Pixel6 -k "system-images;android-34;google_apis;x86_64" -d pixel_6

# Start emulator
emulator -avd Pixel6
```

### Step 9: Run the app!
```bash
# Terminal 1: Start Metro bundler
npx react-native start --reset-cache

# Terminal 2: Build and install on Android
npx react-native run-android
```

---

## Troubleshooting

### Error: "Unable to resolve module @nbfc/config"
The babel module-resolver needs to map @nbfc/* to the packages folder.
```bash
# Verify babel.config.js has the aliases:
cat babel.config.js

# Should contain:
# '@nbfc/config': './packages/config',
# '@nbfc/utils': './packages/utils',
# etc.

# If metro is running, restart with cache clear:
npx react-native start --reset-cache
```

### Error: "Could not find com.facebook.react:react-native"
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Error: "Reanimated plugin error"
```bash
# Make sure reanimated plugin is LAST in babel.config.js
# Then:
npx react-native start --reset-cache
```

### Error: "SDK location not found"
```bash
# Create local.properties in android/
echo "sdk.dir=$HOME/Android/Sdk" > android/local.properties
# Windows: sdk.dir=C:\\Users\\YourName\\AppData\\Local\\Android\\Sdk
```

### Error: "No connected devices"
```bash
# Check devices
adb devices

# If empty, either:
# 1. Start emulator from Android Studio
# 2. Connect physical device with USB debugging enabled

# For physical device:
# Settings → Developer Options → USB Debugging → ON
```

### Metro bundler stuck or slow
```bash
# Kill all Metro processes
npx react-native start --reset-cache

# Or nuclear option:
watchman watch-del-all  # if watchman is installed
rm -rf node_modules
rm -rf /tmp/metro-*
yarn install
npx react-native start --reset-cache
```

### Build succeeds but app crashes on launch
```bash
# Check logs
adb logcat | grep -i "react\|fatal\|error"

# Common fix - rebuild:
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

---

## Demo Flow (After app launches)

1. **Welcome Screen** appears with SK Finance logo + "Sevak"
2. Tap **"Get Started"** → Product Page with loan products
3. Tap **"Create Account"** → Enter any 10-digit mobile (e.g., 9876543210)
4. Tap **"Get OTP"** → OTP screen appears
5. Enter any 5 digits → auto-submits
6. **KYC Form** → Fill Name, DOB, PAN (e.g., ABCDE1234F) → check consent → Continue
7. **Set MPIN** → Enter any 4 digits (e.g., 3635) → Next
8. **Confirm MPIN** → Enter same 4 digits → Confirm
9. **Face ID** → Enable or Skip
10. **Login Successful!** → Tap "Go to dashboard"
11. **Dashboard** with loan card, quick links, recommendations

For **subsequent login** (after closing and reopening):
- Enter MPIN **3635** to authenticate

---

## Project Structure After Setup
```
NBFCSuperApp/
├── android/                 # Native Android (auto-generated)
├── ios/                     # Native iOS (auto-generated)
├── packages/                # @nbfc/* monorepo packages
│   ├── config/              # @nbfc/config
│   ├── utils/               # @nbfc/utils
│   ├── ui/                  # @nbfc/ui (design system)
│   ├── core/                # @nbfc/core (Redux store)
│   ├── security/            # @nbfc/security
│   ├── network/             # @nbfc/network
│   └── i18n/                # @nbfc/i18n
├── src/                     # App screens & navigation
│   ├── navigation/
│   └── screens/
├── App.tsx                  # Root component
├── index.js                 # Entry point
├── babel.config.js          # Module resolver config
├── metro.config.js          # Monorepo-aware bundler
├── tsconfig.json            # TypeScript paths
├── package.json
└── node_modules/
```
