/**
 * Isolated test for the aiService function.
 */
import { jest, describe, it, expect } from '@jest/globals'
import { aiService } from '../utils/aiService.js'

jest.spyOn(global, 'fetch')

describe('ai-service', () => {
  /**
   * Test how the aiService structures the JSON-code that is sent from a mock response in this test-case.
   */
  it('Should format the JSON-answer correctly', 
    /**
     * Test execution function.
     */
    async () => {
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
      /**
       * The mock ai-response sent.
       * 
       * @returns {Promise<object>} A promise that resolves to the mock AI response data.
       */
      json: async () => mockAiResponse
    })

    const result = await aiService.generateQuiz('test-text')
    expect(result[0]).toHaveProperty('question')
    expect(result[0].true).toBe('Berry')
  })
})