import { test, expect } from '@playwright/test';

test.describe('Systemtest for logging in', () => {
  test('User should se the loginform at the start', async ({page})) => {
    await page.goto('http://localhost:5173')

    await expect(page.locator('h1')).toHaveText('QUIZNOTE')

    await page.locator('input[type="email"]').fill('test@mail.com')
    await page.locator('input[type="password"]').fill('testtest')
    await page.locator('.loginBtn').click()

    const myNotesSection = page.locator('text=My notes')
    await expect(myNotesSection).toBeVisible()

    const errorMessage = page.locator('.loginForm p')
    await expect(errorMessage).not.toBeVisible()
  }
})
