const path = require('path');

const mobileModules = path.resolve(__dirname, '../apps/mobile/node_modules');

module.exports = {
  haste: {
    defaultPlatform: 'ios',
    platforms: ['android', 'ios', 'native'],
  },
  testEnvironment: path.resolve(mobileModules, 'react-native/jest/react-native-env.js'),
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [path.resolve(mobileModules, '@react-native/babel-preset')],
    }],
  },
  roots: ['<rootDir>/packages'],
  setupFiles: [
    path.resolve(mobileModules, 'react-native/jest/setup.js'),
    path.resolve(__dirname, 'setup.js'),
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@nbfc/config(.*)$': '<rootDir>/packages/config$1',
    '^@nbfc/utils(.*)$': '<rootDir>/packages/utils$1',
    '^@nbfc/ui(.*)$': '<rootDir>/packages/ui$1',
    '^@nbfc/core(.*)$': '<rootDir>/packages/core$1',
    '^@nbfc/security(.*)$': '<rootDir>/packages/security$1',
    '^@nbfc/network(.*)$': '<rootDir>/packages/network$1',
    '^@nbfc/i18n(.*)$': '<rootDir>/packages/i18n$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@reduxjs/toolkit|react-redux|immer)/)',
  ],
  testMatch: ['**/packages/**/*.test.{ts,tsx}'],
  rootDir: path.resolve(__dirname, '..'),
  modulePaths: [mobileModules],
};
