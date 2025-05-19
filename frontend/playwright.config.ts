import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 2,
  workers: 1,
  reporter: 'html',
  use: {
    // Use the app container name instead of localhost
    baseURL: 'http://app:8080',
    // Increase timeouts to allow for container startup
    navigationTimeout: 60000,
    actionTimeout: 30000,
    // Other settings
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
