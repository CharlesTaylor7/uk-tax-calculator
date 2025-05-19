import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  retries: 1,
  workers: 1,
  reporter: 'html',
  // timeout in 5s for user actions, navigation and DOM asserts
  expect: {
    timeout: 5000,
  },
  use: {
    actionTimeout: 5000,
    navigationTimeout: 5000,
    // Other settings
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,

    // allow running against docker image or local dev server
    baseURL: process.env.CI ? 'http://localhost:8080' : 'http://localhost:4200',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
