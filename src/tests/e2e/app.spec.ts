import { test, expect } from '@playwright/test';

test.describe('Wanderfiz App', () => {
  test('displays the application', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Wanderfiz/);
    await expect(page.locator('nav').locator('text=WanderFiz')).toBeVisible();
  });

  test('loads without errors', async ({ page }) => {
    await page.goto('/');
    
    // Check that there are no serious console errors (ignore SVG path warnings)
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('path') && !msg.text().includes('Expected moveto')) {
        errors.push(msg.text());
      }
    });
    
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });
});