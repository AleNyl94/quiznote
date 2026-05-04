/**
 * Testing the CRUD-functionality for the noteService 
 * backend-component. Using this integrationtest it walk through
 * the lifespan of a Note-object.
 */
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app.js'
import request from 'supertest'

let mongoServer


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
    .post('/notes')
    .send(newNote)

    expect(createRes.status).toBe(201)
    noteId = createRes.body._id

    // Get
    const getRes = await request(app).get('/notes/list')
    expect(getRes.status).toBe(200)
    expect(getRes.body.some(n => n._id === noteId)).toBe(true)

    // Edit
    const updateRes = await request(app)
      .put(`/notes/${noteId}`)
      .send({ title: 'Updated new Title' })
    expect(updateRes.status).toBe(200)

    // Delete
    const deleteRes = await request(app).delete(`/notes/${noteId}`)
    expect(deleteRes.status).toBe(204)
  })
})