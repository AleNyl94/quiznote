/**
 * Testing the CRUD-functionality for the noteService 
 * backend-component. Using this integrationtest it walk through
 * the lifespan of a Note-object.
 */
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { it, jest } from '@jest/globals'
import { noteController } from '../controllers/noteController.js'
import { Note } from '../models/noteModel.js'

/**
 * The dummy database for the tests.
 */

let mongoServer
const mockUserID = new mongoose.Types.ObjectId()
let savedNoteId

describe('Note isolated CRUD Test', () => {
  // Setting up the dummy database
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
    })
  
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  it('Tests the CREATE-function', async () => {
    // Create
    const req = { 
      body: {
        title: 'Test Note', 
        body: 'Content Ipsum Dolor', 
        owner: mockUserID 
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => { savedNoteId = data._id })
    }

    await noteController.create(req, res)
    if (res.status.mock.calls[0][0] === 400) {
    console.log("Mongoose Error:", res.json.mock.calls[0][0])
    }
    expect(res.status).toHaveBeenCalledWith(201)
  })

  it('Getting the users notes', async () => {
    const req = {
      user: { _id: mockUserID }
    }
    const res = {
      locals: {
        user: { _id: mockUserID }
      },
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await noteController.get(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Test Note' })
      ])
    )
  })

  it('Should update the note', async () => {
    const req = { 
      params: { id: savedNoteId },
      body: { title: 'Updated Title' }
     }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await noteController.edit(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('Should delete a note', async () => {
    const noteToDelete = await Note.findById(savedNoteId)

    const req = {}
    const res = {
      locals: { note: noteToDelete },
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn()
    }
    await noteController.delete(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    const check = await Note.findById(savedNoteId)
    expect(check).toBeNull()
  })
})