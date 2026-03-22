# SK Finance — Sevak NBFC Super App

Production-ready React Native CLI monorepo for SK Finance NBFC.

## Monorepo Architecture

```
nbfc-super-app/
├── apps/
│   └── mobile/                    # React Native CLI app (@nbfc/mobile)
│       ├── App.tsx               # Root: Provider + Navigation
│       ├── src/
│       │   ├── navigation/       # RootNavigator (auth-state-driven)
│       │   └── screens/          # 40+ screens organized by feature
│       ├── babel.config.js       # Module resolver → @nbfc/* packages
│       └── metro.config.js       # Watches monorepo packages
│
├── packages/
│   ├── @nbfc/config              # Constants, loan types, limits, languages
│   ├── @nbfc/utils               # Validators, formatters, EMI calculator
│   ├── @nbfc/ui                  # Atomic Design System
│   │   ├── atoms/                # Text, Button, Input, Badge, Avatar, Checkbox, Radio
│   │   ├── molecules/            # OTPInput, MPINInput, PhoneInput, Dropdown, Slider
│   │   ├── organisms/            # LoanCard, ProductTile, ServiceTicketCard, DonutChart
│   │   ├── templates/            # AuthTemplate, FormTemplate, DashboardTemplate, SuccessTemplate
│   │   └── theme/                # colors, typography, spacing
│   ├── @nbfc/core                # Redux store + slices + hooks
│   │   ├── store/slices/         # authSlice, userSlice, loanSlice, serviceSlice
│   │   └── hooks/                # useAuth, useSessionMonitor, useTimer
│   ├── @nbfc/security            # Session mgr, MPIN tracker, secure storage, masking
│   ├── @nbfc/network             # Axios wrapper, interceptors, retry, mock API
│   └── @nbfc/i18n                # i18next with 7 Indian languages
│
├── package.json                  # Yarn Workspaces root
├── turbo.json                    # Turborepo pipeline
└── tsconfig.base.json            # Shared TypeScript config
```

## Quick Start

```bash
# 1. Initialize RN project first (for native android/ios folders)
npx react-native@latest init NBFCSuperApp --version 0.73.4

# 2. Copy this monorepo structure over the initialized project
#    - Replace apps/mobile/ contents
#    - Add packages/ folder
#    - Replace root package.json, turbo.json, tsconfig.base.json

# 3. Install all workspace dependencies
yarn install

# 4. Run
cd apps/mobile
npx react-native start --reset-cache
npx react-native run-android
```

## All Flows (10 complete user journeys)

| Flow | Screens | Entry |
|------|---------|-------|
| ETB Login | Welcome → Log in → Mobile → OTP → MPIN Setup → Confirm → Face ID → Success → Dashboard | "Log in" button |
| NTB Login | Welcome → Get Started → Product Page → Create Account → Mobile → OTP → KYC → MPIN → Dashboard | "Get Started" button |
| Lead | Product Page → Product Detail → Apply → Mobile → OTP → KYC Step 1+2 → MPIN → Success | "Apply Now" on product |
| Subsequent | MPIN Login → Enter PIN / Face ID → Dashboard | App re-open |
| Forgot MPIN | Login → Forgot → Masked Mobile → OTP → Set New → Confirm → Success → Login | "Forgot mPIN?" link |
| Profile Updates | Profile → Personal Info → Update Email/Mobile → OTP Verify → Success (24hr) | Menu tab |
| Payments | Dashboard/Services → Pay EMI form → Make Payment → Success with receipt | "Pay EMI" button |
| E-Mandate | View Mandate → Change Bank → Setup form → Authorize → Success | Quick Link / Services |
| Service Requests | Services → Create: Select Loan → Form → Success / Track: Filter + Cards | Services tab |
| Calculators | EMI Calculator (sliders + donut) / Eligibility Calculator (sliders + result) | Tools section |

## Package Dependencies (DAG)

```
@nbfc/config (standalone - zero deps)
    ↓
@nbfc/utils (depends on @nbfc/config)
    ↓
@nbfc/security (depends on @nbfc/config)
@nbfc/network (depends on @nbfc/config, axios)
@nbfc/i18n (depends on i18next)
    ↓
@nbfc/ui (depends on react-native, @nbfc/config, @nbfc/utils)
@nbfc/core (depends on @reduxjs/toolkit, @nbfc/config, @nbfc/network, @nbfc/security)
    ↓
@nbfc/mobile (consumes ALL packages)
```

## Demo Credentials
- **MPIN**: `3635`
- **Mobile**: Any 10-digit starting with 6-9
- **OTP**: Any 5 digits (auto-accepted in demo)
