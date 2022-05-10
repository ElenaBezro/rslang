const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.resolve.alias['~/config'] = require.resolve('./__mocks__/config');
    config.resolve.alias['~'] = path.resolve('src');
    return config;
  },
};
