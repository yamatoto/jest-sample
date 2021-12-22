const config = {
    transform: { '.(ts|[jt]sx?)$': 'ts-jest' },
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    globals: {
        ENV: {
            TARGET: 'client',
        },
    },
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: ['text', 'lcov'],
    clearMocks: true,
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

module.exports = config;
