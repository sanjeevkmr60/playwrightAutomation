import {test, expect} from '@playwright/test';

test.skip('Handle dropdowns', async({page})=>{
await page.goto('https://practice.expandtesting.com/dropdown')
//based on Value
// await page.locator('#country').selectOption({value: 'IN'});
// await expect(page.locator('#country')).toHaveValue('IN');
//based on Label
// await page.locator('#country').selectOption({label: 'India'});
// await expect(page.locator('#country')).toHaveValue('IN');

// //based on Index
//  await page.locator('#country').selectOption({index: 2});
//  await expect(page.locator('#country')).toHaveValue('AX');

//  //get the count of options in the dropdown
//  const options=page.locator('#country option')
//  console.log('options count: ' + await options.count());
//  await expect(options).toHaveCount(252);


// const options1=page.$$('#country option')
//  console.log('options count: ' + (await options1).length);
//  expect((await options1).length).toBe(252);

 const options=await page.$$('#country option');
 const optionLabels=await Promise.all(
   options.map(option=>option.evaluate(element=>element.textContent?.trim() ?? ''))
 );
 const expectedLabels=['India', 'United States', 'Canada'];
 for (const label of expectedLabels) {
   expect(optionLabels).toContain(label);
 }


 
})