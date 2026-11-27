import {test, expect} from '@playwright/test';

// test.skip('Handle Dialogs', async({page})=>{
//     await page.goto('http://uitestingplayground.com/frames')
//     await page.frame('frame-inner').click('[data-action="edit"]')
//     await page.waitForTimeout(5000);
//     expect( page.frame('frame-inner').locator('[id="result"]')).toHaveText('Button pressed: Edit');

// })

test('Handle Dialogs', async({page})=>{
    const parentFrameUrl = 'https://demoqa.com/sampleiframe.html'
    const parentFrameNavigation = page.waitForEvent(
        'framenavigated',
        frame => frame.url() === parentFrameUrl
    )

    await page.goto('https://demoqa.com/nestedframes')
    await parentFrameNavigation

    const parentFrame = page.frame({url: parentFrameUrl})
    if (!parentFrame) {
        throw new Error(`Frame not found: ${parentFrameUrl}`)
    }

    await expect(parentFrame.locator('body')).toContainText('Parent frame')

})

