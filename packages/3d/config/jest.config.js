/** @type {import('jest').Config} */
const config = {
  silent: true,
  rootDir: '../src',
  setupFiles: [
    'jest-canvas-mock',
    '@2ltech/jest-ant-design-icons',
    '../config/jest.setup.js'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/**/*.ts', '<rootDir>/**/*.tsx'],
  coverageDirectory: '<rootDir>/../coverage',
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest']
  },
  moduleNameMapper: {
    '^@/(.*)$': ['<rootDir>/$1'],
    '^@extra/(.*)$': ['<rootDir>/extra/$1'],
    '@index': ['<rootDir>/../index.d.ts'],
    '@header': ['<rootDir>/header/index.tsx'],
    '^@helpers/(.*)$': ['<rootDir>/helpers/$1'],
    '@loader': ['<rootDir>/loader/index.tsx'],
    '^@tools/(.*)$': ['<rootDir>/tools/$1'],
    '^@store/(.*)$': ['<rootDir>/store/$1'],
    '@store': ['<rootDir>/store/index.ts'],
    '^@style/(.*)$': ['<rootDir>/style/$1']
  }
}

export default config
