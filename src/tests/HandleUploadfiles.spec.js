import {test, expect} from '@playwright/test';

test.skip('Handle Upload Files', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
   //await page.locator('[id="singleFileInput"]').setInputFiles('C:\\Users\\ADMIN\\Downloads\\sample-local-pdf.pdf');
   await page.locator('[id="singleFileInput"]').setInputFiles(
    ['C:\\Users\\ADMIN\\Downloads\\sample-local-pdf.pdf',
    'C:\\Users\\ADMIN\\Downloads\\sample-local-content.pdf']);


  await page.locator('//*[@id="singleFileForm"]/button').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('//*[@id="singleFileStatus"]')).toHaveText('Single file selected: sample-local-pdf.pdf, Size: 49672 bytes, Type: application/pdf');
})

test('Handle Mutiple Upload Files', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
   //await page.locator('[id="singleFileInput"]').setInputFiles('C:\\Users\\ADMIN\\Downloads\\sample-local-pdf.pdf');
   await page.locator('[id="multipleFilesInput"]').setInputFiles(
    ['C:\\Users\\ADMIN\\Downloads\\sample-local-pdf.pdf',
    'C:\\Users\\ADMIN\\Downloads\\sample-local-content.pdf']);


  await page.locator('//*[@id="multipleFilesForm"]/button').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('//*[@id="multipleFilesStatus"]')).toHaveText('Multiple files selected: sample-local-pdf.pdf, Size: 49672 bytes, Type: application/pdf sample-local-content.pdf, Size: 49672 bytes, Type: application/pdf ');


  //removing files from the input field
 await page.locator('[id="multipleFilesInput"]').setInputFiles([]);
   await page.locator('//*[@id="multipleFilesForm"]/button').click();
  await expect(page.locator('//*[@id="multipleFilesStatus"]')).toHaveText('No files selected.');
})