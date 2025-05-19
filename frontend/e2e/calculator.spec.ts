import { test, expect, chromium } from '@playwright/test';

test('calculator should calculate tax correctly', async () => {
  // Create a browser instance that ignores HTTPS errors
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // root url redirects to /calculator
  await page.goto('/');

  // Fill in the salary input
  await page.fill('input[name="grossAnnualSalary"]', '30000');

  // Click the calculate button
  await page.click('button[name="calculate"]');

  // Check that all 6 summary results are displayed
  await expect(page.locator('.calculator__result-row')).toHaveCount(6);

  // Check the annual tax amount is displayed correctly
  await expect(
    page
      .locator('.calculator__result-row', {
        hasText: 'Annual Tax Paid:',
      })
      .locator('.calculator__result-value'),
  ).toContainText('£7,000.00');
});
