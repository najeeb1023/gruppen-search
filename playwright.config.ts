import { LaunchOptions } from "@playwright/test";

export const config: LaunchOptions = {
  timeout: 30000,
  headless: false,
  slowMo: 250,
};
