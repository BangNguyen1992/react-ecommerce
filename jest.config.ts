import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  // automock: true,
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['.next/', 'node_modules/'],
}
export default config
