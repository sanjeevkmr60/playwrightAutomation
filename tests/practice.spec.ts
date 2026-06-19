import { test, expect } from '@playwright/test';

test('verify gmail title', async ({ page }) => {
    await page.goto('https://www.gmail.com/');
    await expect(page.locator('body')).toContainText('Sign in');
    
});

test('verify facebook page', async ({ page }) => {
    await page.goto('https://www.facebook.com/');
    await expect(page.locator('body')).toContainText('Log in to Facebook');

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="pass"]');
    const loginButton = page.getByRole('button', { name: 'Log in' });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await emailInput.fill('sanjeevtesting12@gmail.com');
    await passwordInput.fill('s9949424394');
    await loginButton.click();
});