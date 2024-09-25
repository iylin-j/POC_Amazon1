import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: true,
        environmentInfo: {
          framework: "playwright",
        },
      },],
    ["junit", { outputFile: "playwright-report/e2e-junit-results.xml" }],
    ['list'],
    ['html'],
  ],
  use: {
    trace: "on-first-retry",
    headless: true,
    screenshot: "on",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
