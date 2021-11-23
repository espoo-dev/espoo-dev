import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageReporters: ['json', 'html', 'lcov', 'text', 'clover'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/cypress/',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleDirectories: ['node_modules', 'bower_components', 'src'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    '@api/(.*)': '<rootDir>/src/api/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@context/(.*)': '<rootDir>/src/context/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@hoc/(.*)': '<rootDir>/src/hoc/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@styles/(.*)': '<rootDir>/src/styles/$1',
  },
};

export default config;
