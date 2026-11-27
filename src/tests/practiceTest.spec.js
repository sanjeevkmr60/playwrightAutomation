import {test, expect} from '@playwright/test';

test('Homepage' , async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/')
    const pageTitle=await page.title();
    console.log('pageTitle: ' + pageTitle);

    await expect(page).toHaveTitle('Automation Testing Practice')

    console.log(page.url());
    await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/')

    await page.getByPlaceholder('Enter Name').fill('TestUser');
    await page.waitForTimeout(5000);
    await page.locator('[id="email"]').fill('testuser@example.com');

    await page.waitForTimeout(5000);

    await page.locator('[id="textarea"]').fill('This is a test message for automation practice.');
    await page.waitForTimeout(5000);


    await page.locator('input[id="male"]').check();
    await page.waitForTimeout(5000);

    expect(page.locator('input[id="male"]').isChecked()).toBeTruthy();

    //checkboxes
    await page.locator('input[id="sunday"]').check();
    await page.waitForTimeout(5000);
    await expect(page.locator('input[id="sunday"]')).toBeChecked();





})