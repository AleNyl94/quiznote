import { jest, describe, it, expect } from '@jest/globals'
import { noteController } from '../controllers/noteController.js'
import { Note } from '../models/noteModel.js'
import { aiService } from '../utils/aiService.js'

jest.mock('../models/noteModel.js')
jest.mock('../utils/aiService.js')

describe('Test Note to AI connection', () => {
  it('should fetch the correct note and pass it on to the aiService-component', async () => {
    const mockNote = { id: '123', body: 'Content Ipsum Dolor. Det här är en tillräckligt lång text för att klara kontrollen inuti controllern som kräver minst hundra tecken för ett quiz.' }
    Note.findById = jest.fn().mockResolvedValue(mockNote)

    const mockQuiz = [{ question: 'What is the name for planet Earth?', trueAnswer: 'Tellus', falseAnswer: 'Pluto' }]
    aiService.generateQuiz = jest.fn().mockResolvedValue(mockQuiz)

    const req = { params: { id: '123' }, body: {} }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await noteController.quiz(req, res)

    expect(Note.findById).toHaveBeenCalledWith('123')
    expect(aiService.generateQuiz).toHaveBeenCalledWith('Content Ipsum Dolor. Det här är en tillräckligt lång text för att klara kontrollen inuti controllern som kräver minst hundra tecken för ett quiz.')
    expect(res.json).toHaveBeenCalledWith(mockQuiz)
  })
})