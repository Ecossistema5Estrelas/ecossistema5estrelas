import { test, expect } from '@playwright/test'

test('rota de post inexistente retorna 404', async ({ page }) => {
  const res = await page.goto('/blog/post-inexistente')
  expect(res?.status()).toBe(404)
})