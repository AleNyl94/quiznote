import { test, expect } from '@playwright/test'

test.describe('System-test for quiz-generation flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.fill('input[type="email"]', 'test@mail.com')
    await page.fill('input[type="password"]', 'testtest')
    await page.click('.loginBtn')
    const dashboard = page.locator('.dashboard')
    const note = page.locator('.noteBodyArea')
    await expect(dashboard).toBeVisible()
    await expect(note).toBeVisible()
  })

  test('Should create, save and find a note, then complete an AI quiz, update and delete it', async ({ page }) => {
    await page.fill('.noteTitleInput', 'Romersk Betong')
    await page.fill('.noteBodyArea', 'Vulkanisk aska är den hemliga ingrediensen i romersk betong.')
    await page.click('.quizBtn')
    const errorNotification = page.locator('.notification.errorbox')
    await expect(errorNotification).toBeVisible()
    await expect(errorNotification).toContainText('You need at least 100 characters of text to generate a quiz.')

    await page.fill('.noteBodyArea', 
      'Vulkanisk aska är den hemliga ingrediensen i romersk betong, även kallat opus caementicium. ' +
      'Detta unika material gjorde att betongen kunde härda under vatten, vilket var perfekt för hamnar. ' +
      'Tack vare den vulkaniska askan från Pozzuoli har romerska strukturer som Pantheon överlevt i över tvåtusen år.'
    )
    await page.click('.quizBtn')
    await expect(errorNotification).toBeVisible()
    await expect(errorNotification).toContainText('Save the note first!')
    
    await page.click('.saveBtn')
    await page.getByRole('button', { name: 'My notes' }).click()
    const noteInList = page.locator('.list', { hasText: 'Romersk Betong' })
    await expect(noteInList).toBeVisible()
    await noteInList.click()

    await page.click('.quizBtn')
    const modal = page.locator('.modalOverlay')
    await expect(modal).toBeVisible({ timeout: 5000 })
    await expect(page.locator('.title')).toHaveText('QUIZ TIME')
    
    const nextBtn = page.locator('.nextBtn')
    const resultsHeadline = page.locator('.results h2')

    while (!await resultsHeadline.isVisible()) {
      const optionButton = page.locator('.optionBtn').first()
      const isNextVisible = await nextBtn.isVisible()
      const isOptionVisible = await optionButton.isVisible()

      const isOptionEnabled = isOptionVisible ? await optionButton.isEnabled() : false

      if (!isOptionVisible && !isNextVisible) {
        break
      }

      if (isOptionVisible && isOptionEnabled) {
        await optionButton.click()
      }

      if (isNextVisible) {
        await nextBtn.click()
      }
      await page.waitForTimeout(150)
    }
    await expect(resultsHeadline).toBeVisible({ timeout: 2000 })
    await expect(resultsHeadline).toHaveText('Quiz Finished!')
    await expect(page.locator('.scoreboard')).toBeVisible()

    await page.click('button:has-text("X")')
    await expect(modal).not.toBeVisible()

    await page.fill('.noteTitleInput', 'Ny uppdaterad titel')
    await page.click('.saveBtn')
    await page.getByRole('button', { name: 'My notes' }).click()
    const newNoteInList = page.locator('.list .note-item', { hasText: 'Ny uppdaterad titel' }).first()
    await expect(newNoteInList).toBeVisible()

    page.once('dialog', async dialog => {
      console.log(`Handles dialogue: ${dialog.message()}`)
      await dialog.accept()
    })
    
    await newNoteInList.locator('.deleteBtn').first().click()
    await expect(newNoteInList).not.toBeVisible()
  })
})