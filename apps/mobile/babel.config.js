module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@nbfc/config': '../../packages/config',
        '@nbfc/utils': '../../packages/utils',
        '@nbfc/ui': '../../packages/ui',
        '@nbfc/core': '../../packages/core',
        '@nbfc/security': '../../packages/security',
        '@nbfc/network': '../../packages/network',
        '@nbfc/i18n': '../../packages/i18n',
      },
    }],
    'react-native-reanimated/plugin',
  ],
};
