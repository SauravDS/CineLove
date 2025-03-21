module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/*.test.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['text', 'lcov'],
  };