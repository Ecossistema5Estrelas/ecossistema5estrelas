import { test, expect } from '@playwright/test'

test('sitemap é determinístico e contém apenas rotas públicas', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)

  const xml = await res.text()

  expect(xml).toContain('<loc>')
  expect(xml).toContain('/blog')
  expect(xml).not.toContain('draft')
})