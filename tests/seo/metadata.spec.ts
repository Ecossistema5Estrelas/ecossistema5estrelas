import { test, expect } from '@playwright/test'

test('home possui canonical único', async ({ page }) => {
  await page.goto('/')
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
  expect(canonical).toBeTruthy()
})