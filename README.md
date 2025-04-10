# Playwright E2E Testing Framework

This project contains end-to-end tests using Playwright, as well as API tests in Jest and Supertest for validating API responses. 

## ⚠️ Known Bugs

1. The [POST] - `/metadata/query` endpoint has the following limitations:

- **Hard-coded data**: The endpoint does not actually process POST requests
- **Response code**: Status code is 200 instead of 201
- **Static response**: It returns existing data from [this repository](https://github.com/paluchs-iohk/metadata-server-mock), as long as payload follows the defined schema and must include a valid `subjectId` (e.g `2048c7e09308f9138cef8f1a81733b72e601d016eea5eef759ff2933416d617a696e67436f696e` or `919e8a1922aaa764b1d66407c6f62244e77081215f385b60a62091494861707079436f696e`)

2. Performance Issues:

- **Application fails to respond**: Running the tests sometimes fails as the app is flaky and fails to respond 

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm 

### Installation

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration

## 🔧 Environment Configuration

The tests can be configured using environment config.

### Configuration Methods

1. Create a `.env` file based on `.env.example`


## 🧪 Running E2E Tests

### Run all tests with Cucumber
```bash
npm 
```

### Run Playwright e2e tests
```bash
npm run e2e
```

### View test reports
```bash
npm run e2e:report
```

### Run tests with UI mode
```bash
npm run e2e:ui
```

### Run tests on debug mode
```bash
npm run e2e:debug
```
## 📊 E2E Test Reports

- Playwright HTML reports can be viewed using `npm run e2e:report`

## 🧪 Running API Tests

```bash
npm run api
```

## 🔄 GitHub Actions Workflow

This project includes a GitHub Actions workflow for automated testing. The workflow runs both API and E2E tests in separate jobs, with the following features:

### Workflow Structure

- **Setup Job**: Installs dependencies and prepares the environment
- **API Tests Job**: Runs API tests in parallel with E2E tests
- **E2E Tests Job**: Runs end-to-end tests in parallel with API tests
- **Notification Job**: Creates GitHub issues on test failures

### Trigger Events

The workflow runs on:
- Push to main/master branches
- Pull requests to main/master branches
- Daily at midnight UTC (scheduled)
- Manual trigger (workflow_dispatch)

### Manual Trigger

You can manually trigger the workflow from the GitHub Actions tab in your repository.
