
import {test, expect} from '@playwright/test';

test('Handle Dialogs', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
   

    await page.getByRole('link', {name:'PlaywrightPractice'}).click();

  

    // page.on('dialog', async(dialog)=>{
    //      page.pause();
    //     console.log(dialog.message());
      
    //     await dialog.accept();
       
    // })

    // page.locator('button[id="alertBtn"]').click();
    //  await page.waitForTimeout(15000);

    // page.on('dialog', async(dialog)=>{
       
    //     console.log(dialog.message());
      
    //     await dialog.accept();
       
    // })

    // page.locator('button[id="confirmBtn"]').click();
    // await expect(page.locator('//*[@id="demo"]')).toHaveText('You pressed OK!');
    //  await page.waitForTimeout(5000);


      page.on('dialog', async(dialog)=>{
       
        //console.log(dialog.message());
      
        await dialog.accept('John Doe');
       
    })

    await page.locator('button[id="promptBtn"]').click();
    await expect(page.locator('//*[@id="demo"]')).toHaveText('Hello John Doe! How are you today?');
    page.pause();
     await page.waitForTimeout(5000);

})