# SauceDemo Automated Tests

This repository contains automated tests for the SauceDemo website using **Playwright**. The tests cover key functionalities, including smoke tests and regression tests, utilizing the Page Object Model (POM) design pattern for maintainability and scalability.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v12 or later)
- **npm** (comes with Node.js)
- **Playwright** (automatically installed with the project dependencies)

## Installation


Clone this repository to your local machine using the following command:
```bash
git clone https://github.com/AdnanSabljic/Software_Testing_Project
cd Software_Testing_Project
```
Install the required dependencies using npm:
```bash
npm install
```
Instal Playwright browser:
```bash
npx playwright install
```
### Running the tests

## Running all tests
To run all tests in the project, use the following command:
```bash
npx playwright test
```

## Running only smoke tests
To run only the smoke tests, use:
```bash
npx playwright test --config=smoke.config.ts
```

## Running only regression tests
To run only the regression tests, use:
```bash
npx playwright test --config=regression.config.ts

```

## Run a specific test
To run a specific test file, specify the file path:
```bash
npx playwright test [Name of the file that you want to test].test.ts
```

## Run smoke tests in headed mode

```bash
npx playwright test --grep "Smoke" --headed
```

## Run regression tests in headed mode

```bash
npx playwright test --grep "Regression" --headed
```



















