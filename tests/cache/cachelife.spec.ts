import { test, expect } from '@playwright/test'

test('blog index responde corretamente (rota pública)', async ({ page }) => {
  const res = await page.goto('/blog')
  expect(res?.status()).toBe(200)
})