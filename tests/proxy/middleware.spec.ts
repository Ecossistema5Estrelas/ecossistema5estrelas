import { test, expect } from '@playwright/test'

test('sitemap não sofre interferência de middleware', async ({ request }) => {
  const res = await request.get('/sitemap.xml', {
    headers: { 'x-test-header': 'proxy-check' }
  })

  expect(res.status()).toBe(200)
})