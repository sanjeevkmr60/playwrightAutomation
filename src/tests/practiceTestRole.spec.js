import {test, expect} from '@playwright/test';

test('Homepage' , async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/')

    await page.getByRole('link', {name:'PlaywrightPractice'}).click();

    //<button role="button">Primary Action</button>

    await page.getByRole('button', { name: 'Primary Action' }).click();

    await page.waitForTimeout(5000);

    await page.getByRole('button', {name:'Toggle Button'}).click();

    await page.waitForTimeout(5000);


    await page.locator('#role-locators').getByRole('link', {name:'Home'}).click();

    await expect(page.locator('[role="alert"]')).toHaveText('This is an important alert message!');
    
     await page.waitForTimeout(5000);

    await page.locator('#role-locators').getByRole('link', {name:'Products'}).click();

    await expect(page.locator('[role="alert"]')).toHaveText('This is an important alert message!');
    
     await page.waitForTimeout(5000);

     await page.locator('#role-locators').getByRole('link', {name:'Contact'}).click();

    await expect(page.locator('[role="alert"]')).toHaveText('This is an important alert message!');
    
     //await page.waitForTimeout(5000);


})