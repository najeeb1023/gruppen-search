# HASOMED Group Test Automation Framework

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![Cucumber](https://img.shields.io/badge/BDD_-Cucumber-7dc327?logo=cucumber)

## Overview

This repository contains the test automation framework using Playwright and Cucumber in TypeScript.  

## Features

- **Playwright Integration**: Fast and reliable end-to-end testing.
- **Cucumber Support**: BDD testing approach with Gherkin syntax.
- **CI/CD Integration**: Seamless integration with CI pipelines.

## CI/CD Integration

The project includes integration with CI/CD pipelines, automatically triggering tests on each commit. Resulting in cucumber-report in HTML format which can
be used to view the test results.

## Project Structure

├── .github/workflows # GitHub Actions workflows  
├── config # Configuration files  
├── src/test # Test scripts and page objects  
├── package.json # Project dependencies and scripts  
├── playwright.config.ts # Playwright configuration  
├── tsconfig.json # TypeScript configuration  

## Getting Started

### Installation

1. Clone the repository:  
- git clone this repositroy.

2. Install dependencies:  
- npm i

3. To run the project:  
* npm run sanity - To run all the test scenarios. 