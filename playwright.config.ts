import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Parse environment variables with defaults
const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
  retries: parseInt(process.env.RETRY_COUNT || '2', 10),
  workers: parseInt(process.env.WORKERS || '3', 10),
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }]
  ],
  use: {
    baseURL: process.env.URL || 'https://metadata-server-mock.onrender.com',
    trace: process.env.TRACING === 'true' ? 'on-first-retry' : 'off',
    screenshot: (process.env.SCREENSHOT === 'on' || process.env.SCREENSHOT === 'off' || process.env.SCREENSHOT === 'only-on-failure') 
      ? process.env.SCREENSHOT 
      : 'only-on-failure',
    video: process.env.VIDEO === 'true' ? 'retain-on-failure' : 'off',
    viewport: {
      width: parseInt(process.env.VIEWPORT_WIDTH || '1280', 10),
      height: parseInt(process.env.VIEWPORT_HEIGHT || '720', 10)
    },
  },
  projects: getBrowserProjects(),
  outputDir: 'test-results/',
  preserveOutput: 'always',
  testMatch: ['**/*.spec.ts'],
  testIgnore: ['**/node_modules/**'],
};

// Function to determine which browsers to use based on environment variable
function getBrowserProjects() {
  const browserEnv = process.env.BROWSER?.toLowerCase() || 'firefox';
  
  // If browser is set to 'all', run on all browsers
  if (browserEnv === 'all') {
    return [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
    ];
  }
  
  // Otherwise, run only on the specified browser
  switch (browserEnv) {
    case 'chromium':
      return [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
      ];
    case 'firefox':
      return [
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
        },
      ];
    case 'webkit':
      return [
        {
          name: 'webkit',
          use: { ...devices['Desktop Safari'] },
        },
      ];
    default:
      console.warn(`Warning: Unknown browser "${browserEnv}". Using chromium as default.`);
      return [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
      ];
  }
}

// Validate required environment variables
if (!process.env.URL) {
  console.warn('Warning: URL environment variable is not set. Using default URL.');
}

export default config; 