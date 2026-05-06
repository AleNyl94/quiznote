import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../app.js'

// Dummy-database to avoid issues during the testing phase.
let mongoServer

/**
 * Test for the auth-component functions.
 */
describe('Test1.1: Authentication', () => {

  beforeAll(async () => {

  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()

  await mongoose.connect(uri)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
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
    
    expect(response.statusCode).toBe(201)
  })

  test('Gives a error message if the user is already registered', async () => {
    const response = await request(app)
      .post('/signup')
      .send(newUser)

    expect(response.statusCode).toBe(409)
  })
})
