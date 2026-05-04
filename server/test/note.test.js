/**
 * Testing the CRUD-functionality for the noteService 
 * backend-component. Using this integrationtest it walk through
 * the lifespan of a Note-object.
 */
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import app from '../app.js'
import request from 'supertest'

/**
 * The dummy database for the tests.
 */

let mongoServer

/**
 * Simulating login so that the checkAuth-middleware is letting
 * the tests through.
 */
jest.mock('../middleware/authenticate.js', () => ({
  checkAuth: (req, res, next) => {
    res.locals.user = { 
      _id: '66361a94e68e0f98e6b26c6d',
      email: 'test@test.com' 
    }
    next()
  }
}))

/**
 * The integration test.
 */
describe('Test2.1: Note CRUD Integration Test', () => {
  // Setting up the dummy database
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
    })
  
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  // creates a mock user to own the test-note.
  const mockUser = { _id: new mongoose.Types.ObjectId().toString(), email: 'test@test.com' }
  let noteId

  it('Tests the full CRUD-cycle', async () => {
    // Create
    const newNote = { title: 'Test Note', body: 'Content Ipsum Dolor', owner: mockUser._id }
    const createRes = await request(app)
    .post('/note')
    .send(newNote)

    expect(createRes.status).toBe(201)
    noteId = createRes.body._id

    // Get
    const getRes = await request(app).get('/note/list')
    expect(getRes.status).toBe(200)
    expect(getRes.body.some(n => n._id === noteId)).toBe(true)

    // Edit
    const updateRes = await request(app)
      .put(`/note/${noteId}`)
      .send({ title: 'Updated new Title' })
    expect(updateRes.status).toBe(200)

    // Delete
    const deleteRes = await request(app).delete(`/note/${noteId}`)
    expect(deleteRes.status).toBe(204)
  })
})