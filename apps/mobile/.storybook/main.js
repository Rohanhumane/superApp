module.exports = {
  stories: [
    './atoms.stories.tsx',
    '../../packages/ui/atoms/**/*.stories.tsx',
    '../../packages/ui/molecules/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
  ],
};