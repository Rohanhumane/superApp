const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

const packagesPath = path.resolve(__dirname, '../../packages');
const rootPath = path.resolve(__dirname, '../..');

const config = {
  watchFolders: [packagesPath],
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(rootPath, 'node_modules'),
    ],
    // Map @nbfc/* package imports to actual folder paths
    // This allows packages to import from each other
    extraNodeModules: {
      '@nbfc/config': path.resolve(packagesPath, 'config'),
      '@nbfc/utils': path.resolve(packagesPath, 'utils'),
      '@nbfc/ui': path.resolve(packagesPath, 'ui'),
      '@nbfc/core': path.resolve(packagesPath, 'core'),
      '@nbfc/security': path.resolve(packagesPath, 'security'),
      '@nbfc/network': path.resolve(packagesPath, 'network'),
      '@nbfc/i18n': path.resolve(packagesPath, 'i18n'),
    },
    sourceExts: ['tsx', 'ts', 'jsx', 'js', 'json'],
  },
};
module.exports = mergeConfig(defaultConfig, config);
