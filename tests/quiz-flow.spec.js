import { test, expect } from '@playwright/test'

test.describe('System-test for quiz-generation flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
    await page.fill('input[type="email"]', 'test@mail.com')
    await page.fill('input[type="password"]', 'testtest')
    await page.click('.loginBtn')
    const dashboard = page.locator('.dashboard')
    const note = page.locator('.noteBodyArea')
    await expect(dashboard).toBeVisible()
    await expect(note).toBeVisible()
  })

  test('Should create, save and find a note, then complete an AI quiz', async ({ page }) => {
    await page.fill('.noteTitleInput', 'Romersk Betong')
    await page.fill('.noteBodyArea', 'Vulkanisk aska är den hemliga ingrediensen i romersk betong.')

    await page.click('.saveBtn')
    await page.getByRole('button', { name: 'My notes' }).click()
    const noteInList = page.locator('.list', { hasText: 'Romersk Betong' })
    await expect(noteInList).toBeVisible()
    await noteInList.click()

    await page.click('.quizBtn')
    const modal = page.locator('.modalOverlay')
    await expect(modal).toBeVisible()
    await expect(page.locator('.title')).toHaveText('QUIZ TIME')
    
    const optionButton = page.locator('.optionBtn').first();
    await expect(optionButton).toBeVisible();
    await optionButton.click();

    const nextBtn = page.locator('.nextBtn')
    await expect(nextBtn).toBeVisible()
    await nextBtn.click()

    await expect(page.locator('.results h2')).toHaveText('Quiz Finished!')
    await expect(page.locator('.scoreboard')).toBeVisible()

    await page.click('button:has-text("Close")')
    await expect(modal).not.toBeVisible()
  })
})