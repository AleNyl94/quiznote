import { jest, describe, it, expect } from '@jest/globals'
import { noteController } from '../controllers/noteController.js'
import { Note } from '../models/noteModel.js'
import { aiService } from '../utils/aiService.js'

jest.mock('../models/noteModel.js')
jest.mock('../utils/aiService.js')

describe('Test Note to AI connection', () => {
  it('should fetch the correct note and pass it on to the aiService-component', async () => {
    const mockNote = { _id: '123', body: 'Knowledge about space'}
    Note.findById = jest.fn().mockResolvedValue(mockNote)

    const mockQuiz = [{ question: 'What is the name for planet Earth?', trueAnswer: 'Tellus', falseAnswer: 'Pluto' }]
    aiService.generateQuiz = jest.fn().mockResolvedValue(mockQuiz)

    const req = { params: { noteId: '123' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await noteController.quiz(req, res)

    expect(Note.findById).toHaveBeenCalledWith('123')
    expect(aiService.generateQuiz).toHaveBeenCalledWith('Knowledge about space')
    expect(res.json).toHaveBeenCalledWith(mockQuiz)
  })
})