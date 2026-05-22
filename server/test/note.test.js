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
        body: 'Content Ipsum Dolor. Det här är en tillräckligt lång text för att klara kontrollen inuti controllern som kräver minst hundra tecken för ett quiz.', 
        owner: mockUserID 
      },
      params: {},
      session: {
        user: {
          id: mockUserID.toString(),
          email: 'test@test.com'
        }
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((data) => {
        if (data && data._id) {
          savedNoteId = data._id
        }
        return res
      }),
      sendStatus: jest.fn().mockReturnThis()
    }

    await noteController.create(req, res)
    if (res.status.mock.calls[0][0] === 400) {
    console.log("Mongoose Error:", res.json.mock.calls[0][0])
    }
    expect(res.status).toHaveBeenCalledWith(201)
  })

  it('Getting the users notes', async () => {
    const req = {
      session: { user: { id: mockUserID.toString() } },
      user: { _id: mockUserID }
    }
    const res = {
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
<<<<<<< HEAD
    const noteFound = await Note.findById(savedNoteId)

    const req = {
      params: { id: savedNoteId },
      body: { title: 'Updated Title' } 
=======
    const req = { 
      params: { id: savedNoteId },
      body: { 
        title: 'Updated Title',
        body: 'Uppdaterad lång text för att fortfarande klara valideringsreglerna.'
      }
>>>>>>> 595da33235526ef45d01ac85bb551bc34797409f
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await noteController.edit(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('Should delete a note', async () => {
    const req = { 
      params: { 
        id: savedNoteId 
      }
    }
    const res = {
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