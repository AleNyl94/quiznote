/**
 * Isolated test for the aiService function.
 */
import { jest, describe, it, expect } from '@jest/globals'
import { aiService } from '../utils/aiService.js'

jest.spyOn(global, 'fetch')

describe('ai-service', () => {
  it('Should format the JSON-answer correctly', async () => {
    const mockAiResponse = {
        choices: [
          { 
            message: { 
              content: JSON.stringify({ 
                tasks: [
                  { question: 'Cherry is a...', 
                    trueAnswer: 'Berry', 
                    falseAnswer: 'Car '
                  }
                ]
              })
          }
        }
      ]
    }
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockAiResponse
    })

    const result = await aiService.generateQuiz('test-text')
    expect(result[0]).toHaveProperty('question')
    expect(result[0].true).toBe('Berry')
  })
})