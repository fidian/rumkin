import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

// Two projects, the same split the Fudgel repo uses: pure logic runs under
// Node where it is fast, and anything that touches the DOM runs in a real
// browser rather than a shim. Custom elements are the whole point here, so a
// shim would be testing the shim.
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        projects: [
            {
                test: {
                    name: 'unit',
                    environment: 'node',
                    include: ['test/unit/**/*.test.ts'],
                },
                resolve: {
                    alias: {
                        '@': fileURLToPath(new URL('./src', import.meta.url)),
                    },
                },
            },
            {
                test: {
                    name: 'browser',
                    include: ['test/browser/**/*.test.ts'],
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium' }],
                    },
                },
                resolve: {
                    alias: {
                        '@': fileURLToPath(new URL('./src', import.meta.url)),
                    },
                },
            },
        ],
    },
});
