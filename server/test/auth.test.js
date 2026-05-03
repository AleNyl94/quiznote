import { jest, describe, test, expect } from '@jest/globals'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../app.js'

describe('Test1.1: Authentication', () => {
  afterAll(async () => {
    await mongoose.disconnect()
  })

  const newUser = {
    username: 'usertest',
    password: 'secretpassword',
    email: 'usertest@mail.com'
    }
    test('Register a new user', async () => {
    const response = await request(app)
    .post('/signup')
    .send(newUser)
    
    expect(response.statusCode).toBe(200)
  })

  test('Gives a error message if the user is already registered', async () => {
    const response = await request(app)
      .post('/signup')
      .send(newUser)

    expect(response.statusCode).toBe(400)
  })
})
