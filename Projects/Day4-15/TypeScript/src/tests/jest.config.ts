module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: ['<rootDir>/setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/setupAfterEnv.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: '<rootDir>/coverage',
};