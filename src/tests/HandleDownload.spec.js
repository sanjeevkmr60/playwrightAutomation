import { existsSync, readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

test('Download and validate a text file', async ({ page }, testInfo) => {
    const fileContent = 'Playwright download check';

    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
    await page.locator('#inputText').fill(fileContent);
    await page.locator('#generateTxt').click();

    const downloadPromise = page.waitForEvent('download');
    await page.locator('#txtDownloadLink').click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe('info.txt');

    const filePath = testInfo.outputPath(download.suggestedFilename());
    await download.saveAs(filePath);

    expect(existsSync(filePath)).toBe(true);
    expect(readFileSync(filePath, 'utf8')).toBe(fileContent);
});
