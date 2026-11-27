import {test, expect} from '@playwright/test';

test('Handle New Tab', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    const newTabPromise = page.waitForEvent('popup')
    await page.getByRole('button', {name: 'New Tab'}).click()
    const newTab = await newTabPromise

    await expect(newTab).toHaveURL('https://www.pavantestingtools.com/')
    await expect(newTab).toHaveTitle('SDET-QA Blog')
})

test('Handle Popup Window', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    const popupPromise = page.waitForEvent('popup')
    await page.getByRole('button', {name: 'Popup Windows'}).click()
    const popup = await popupPromise

    await expect(popup).toHaveURL('https://www.selenium.dev/')
    await expect(popup).toHaveTitle('Selenium')
})
