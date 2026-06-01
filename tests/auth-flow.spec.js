import { test, expect } from '@playwright/test'
import mongoose from 'mongoose'

test.describe('Systemtest for signing up and logging in', () => {
  test('User should se the loginform at the start', async ({page}) => {
    await page.goto('/')

    await expect(page.locator('h1')).toHaveText('QUIZNOTE')

    await page.locator('.signUpBtn').click()
    await page.getByPlaceholder('Your username').fill('test1')
    await page.getByPlaceholder('Your email').fill('test1@mail.com')
    await page.getByPlaceholder('Password').fill('testtest1')
    await page.locator('.submitBtn').click()

    const loginButton = page.locator('.loginBtn')
    await loginButton.waitFor({ state: 'visible', timeout: 3000 })

    await page.locator('input[type="email"]').fill('test1@mail.com')
    await page.locator('input[type="password"]').fill('testtest1')
    await page.locator('.loginBtn').click()

    const myNotesSection = page.locator('text=My notes')
    await expect(myNotesSection).toBeVisible()

    const errorMessage = page.locator('.loginForm')
    await expect(errorMessage).not.toBeVisible()
  })
})

test.afterAll(async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/Quiznote'
  await mongoose.connect(mongoURI)
  
  await mongoose.connection.collection('users').deleteOne({ email: 'test1@mail.com' })

  await mongoose.disconnect()
  console.log('Testdata is terminated')
})