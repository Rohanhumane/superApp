# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SK Finance Sevak — a React Native 0.73.4 (React 18.2.0) mobile app for an Indian NBFC. Android package: `com.skfinance.sevak`, component name: `SKFinanceSevak`. Supports loan applications, EMI payments, e-mandate, service requests, and profile management.

## Monorepo Structure

npm workspaces. The mobile app (`apps/mobile`) consumes 7 internal `@nbfc/*` packages:

- **@nbfc/config** — Constants (loan types, languages, limits, timeouts). Zero dependencies. Single source of truth for all magic numbers.
- **@nbfc/utils** — Validators (PAN, mobile with +91 handling, IFSC, MPIN), formatters (INR currency, dates), calculators (EMI, eligibility).
- **@nbfc/ui** — Atomic Design component library (atoms → molecules → organisms → templates). Components live in `atoms/ComponentName/ComponentName.tsx` folders with index re-exports. Do NOT create flat files like `atoms/Button.tsx` — they shadow folder re-exports.
- **@nbfc/core** — Redux Toolkit store with 4 slices (auth, user, loan, service) and hooks (useAuth, useSessionMonitor, useTimer). Constants imported from `@nbfc/config`.
- **@nbfc/security** — SessionManager, MPINTracker, SecureStorage (swap with react-native-keychain for prod), DataMasking, ScreenshotPrevention.
- **@nbfc/network** — Axios wrapper with token refresh (deduplicated), retry (3 attempts, 30s timeout), mock API (`USE_MOCK_API = __DEV__`). Platform header uses `Platform.OS`.
- **@nbfc/i18n** — i18next with English and Hindi locales.

Package dependency order: config → utils/security/network/i18n → ui/core → mobile app.

## Quick Start

```bash
npm install        # installs all workspaces
npm start          # Metro bundler
npm run android    # build & run on Android
npm run ios        # build & run on iOS
```

## Testing

Jest 30.3.0 with React Testing Library. Shared config at `jest/jest.config.js`.

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Single package
cd packages/utils && npm test
cd packages/core && npm test
cd packages/network && npm test
```

## Code Quality

- ESLint: `.eslintrc.js` (extends `@react-native`)
- Prettier: `.prettierrc` (single quotes, trailing commas, 120 width)
- TypeScript: `npm run lint` runs `tsc --noEmit`

## Architecture Notes

**Navigation:** Root navigator uses Redux auth state + `key` prop to force remount on auth changes. Stacks: authenticated (tabs), locked, session_expired, returning, fresh.

**Auth State Machine:** `idle` → `otp_sent` → `otp_verified` → `mpin_set` → `authenticated`. Also `locked` (3 MPIN failures) and `session_expired` (5min inactive). All constants from `APP_CONFIG`.

**Path Resolution (3 layers):**
1. Metro `extraNodeModules` — runtime bundling
2. Babel `module-resolver` — transpilation
3. TypeScript `paths` — type checking
All three map `@nbfc/*` → `packages/*`. Metro also pins `react`, `react-native`, `@reduxjs/toolkit` to mobile's `node_modules` to prevent duplicate copies.

**Android:** Package `com.skfinance.sevak`, Kotlin source in `android/app/src/main/java/com/skfinance/sevak/`. Hermes enabled, min SDK 21, compile SDK 34.

**Token Management:** `TokenManager` singleton handles storage, refresh deduplication (promise lock), listener notifications.

**Demo Credentials:** MPIN: 3635, Mobile: any 10-digit starting with 6-9, OTP: any 5 digits.
