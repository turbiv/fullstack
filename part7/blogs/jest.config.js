module.exports = {
  testEnvironment: 'node',
  setupFiles:[
    "<rootDir>/src/tests/setupTests.js"
  ],
  transformIgnorePatterns:["/node_modules/(?!@testing-library)"]
};