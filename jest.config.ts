import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@funds/(.*)$': '<rootDir>/src/app/features/funds/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@transactions/(.*)$': '<rootDir>/src/app/features/transactions/$1',
    '^@testing/(.*)$': '<rootDir>/src/app/testing/$1',
  },
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.mock.ts',
    '!src/**/index.ts',
    '!src/**/*.routes.ts',
    '!src/**/*.config.ts',
    '!src/**/*.provider.ts',
    '!src/main.ts',
    '!src/main.server.ts',
  ],
  coverageReporters: ['html', 'lcov', 'text'],
};

export default config;
