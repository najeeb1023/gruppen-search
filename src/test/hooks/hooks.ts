import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { config } from "../../../playwright.config";
import { pageFixture } from "./pageFixture";
const fs = require('fs');
const axios = require('axios');
import path from 'path';

let browser: Browser;
let context: BrowserContext;


function deleteFolderContentsExcept(folderPath: string, exceptions: string[] = []) {
  if (!fs.existsSync(folderPath)) {
    console.log(`❌ Folder not found: ${folderPath}`);
    return;
  };

  // @ts-ignore
  fs.readdirSync(folderPath).forEach(file => {
    const fullPath = path.join(folderPath, file);
    if (exceptions.includes(file)) {
      console.log(`🛑 Skipping: ${file}`);
      return;
    };

    try {
      if (fs.lstatSync(fullPath).isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`🗑️  Deleted folder: ${file}`);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`🗑️  Deleted file: ${file}`);
      };
    } catch (error) {
      console.error(`⚠️ Failed to delete ${file}:`, error);
    };
  });
};

BeforeAll(async function () {
    browser = await chromium.launch(config);
});

Before(async function ({ pickle }) {
    
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        viewport: {
            width: 1680,
            height: 800,
        },
        recordVideo: {
            dir: `./test-results/videos/${pickle.name}.mp4`,
            size: {
            width: 1680,
            height: 800
            }
        },
        permissions: ["geolocation"],
        geolocation: {
        latitude: 52.5200,
        longitude: 13.4050
    }
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    const page = await context.newPage();
    pageFixture.page = page;
});

After(async function ({ pickle, result }) {
    let videoPath;
    let img: Buffer;
    const path = `./test-results/trace/${pickle.id}.zip`;
    console.log(result?.status 
        ? result.status === "PASSED"
            ? "\x1b[1m\x1b[32m  \n  PASSED ✅ \x1b[0m"
            : "\x1b[1m\x1b[31m  \n  FAILED ❌ \x1b[0m"
        : "No status available"
    );

    if (result?.status === Status.PASSED) {
        const img = await pageFixture.page.screenshot({ 
            path: `./test-results/screenshots/${pickle.name}.png`, 
            type: "png" 
        });
        await this.attach(img, "image/png");

        videoPath = await pageFixture.page.video()?.path();
        await this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );
    }

    else if (result?.status === Status.FAILED) {
        const img = await pageFixture.page.screenshot({ 
            path: `./test-results/screenshots/${pickle.name}.png`, 
            type: "png" 
        });
        await this.attach(img, "image/png");

        videoPath = await pageFixture.page.video()?.path();
        await this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
        await this.attach(`Trace file: ${traceFileLink}`, 'text/html')
    };
        await context.close();
});


AfterAll(async function () {
    await browser.close();
});