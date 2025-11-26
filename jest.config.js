module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  testTimeout: 20000, // guard for slow machines
  // If some tests are ESM or require transforms, add them here
  // transform: {...}
};
