import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  // automock: true,
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['.next/', 'node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },
}
export default config
