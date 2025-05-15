import { test, expect } from '@playwright/test';

test('calculator should calculate tax correctly', async ({ page }) => {
  // Navigate to the calculator page
  await page.goto('/');

  // Fill in the salary input
  await page.fill('input[name="grossAnnualSalary"]', '30000');

  // Click the calculate button
  await page.click('button[name="calculate"]');

  // Check that the results are displayed
  await expect(page.locator('.calculator__result-row')).toHaveCount(6);

  // Check that the tax amount is displayed correctly
  await expect(
    page
      .locator('.calculator__result-row', {
        hasText: 'Annual Tax Paid:',
      })
      .locator('.calculator__result-value')
  ).toContainText('£3,000.00');
});
