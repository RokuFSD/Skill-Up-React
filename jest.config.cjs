module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: { '\\.[jt]sx?$': 'babel-jest' },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js'
  }
};
