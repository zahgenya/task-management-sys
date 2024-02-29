export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.test\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
}