const path = require('path');

module.exports = {
  project: {
    android: {
      sourceDir: './android',
    },
    ios: {
      sourceDir: './ios',
    },
  },
  assets: ['./src/assets/fonts/'],
  dependencies: {
    // Tell RN CLI where to find native modules in monorepo
    // All node_modules are hoisted to root or in apps/mobile/node_modules
  },
};
