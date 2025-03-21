const { test, expect } = require('@playwright/test');

test.describe('WatchRoom E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/watch/test123');
  });

  test('loads video player and chat', async ({ page }) => {
    await expect(page.locator('.videoPlayer')).toBeVisible();
    await expect(page.locator('.chatBox')).toBeVisible();
    await expect(page.getByText('Room ID: test123')).toBeVisible();
  });

  test('sends a chat message', async ({ page }) => {
    await page.fill('input[placeholder="Type a message..."]', 'Hello, everyone!');
    await page.press('input[placeholder="Type a message..."]', 'Enter');
    await expect(page.getByText('Hello, everyone!')).toBeVisible();
  });

  test('copies Room ID to clipboard', async ({ page }) => {
    await page.click('button:text("Copy Room ID")');
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe('test123');
    await expect(page.getByText('Copied!')).toBeVisible();
  });
});