module.exports = {
  preset: 'jest-puppeteer',
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
  "reporters": [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report",
      "includeFailureMsg": true,
      "includeConsoleLog": true
    }]
  ]
}
