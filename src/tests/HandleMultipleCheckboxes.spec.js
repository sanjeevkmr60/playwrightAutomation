import {test, expect } from '@playwright/test';
test('Handle Multiple checkboxes', async({page})=>{
      await page.goto('https://testautomationpractice.blogspot.com/')

      const checkboxLocators=[
        "//input[@id='monday' and @type='checkbox']",
        "//input[@id='sunday' and @type='checkbox']",
        "//input[@id='tuesday' and @type='checkbox']",
        "//input[@id='saturday' and @type='checkbox']"
      ]

      for(const loc of checkboxLocators){
        const checkbox=page.locator(loc);
        await checkbox.check();
        await expect(checkbox).toBeChecked();
      }

      //uncheck all checkboxes
      for(const loc of checkboxLocators){
        const checkbox=page.locator(loc);
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
      }
})