// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom/extend-expect');

// eslint-disable-next-line no-undef
jest.mock('~/config/env', () => ({
  SERVER_URL: 'http://localhost:5000',
  BASE_URL: '/',
}));
