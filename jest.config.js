module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  // testMatch: ['**/test/**/*.test.ts'],
  // reporters: ['default', ['jest-junit', {}]],
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/$1',
  },
};
