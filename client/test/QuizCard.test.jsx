/** @vitest-environment jsdom */
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import QuizCard from '../src/components/quizCard/quizCard'

describe('QuizCard Component', () => {
  
  const mockData = {
    question: 'What is the primary ingredient in Roman concrete?',
    correctAnswer: 'Volcanic ash',
    shuffledOptions: ['Volcanic ash', 'Portland cement']
  }

  const mockProps = {
    data: mockData,
    currentIndex: 0,
    totalQuestions: 1,
    nextQuestion: vi.fn(),
    onClose: vi.fn()
  }

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('should render the question and both answer options', () => {
    render(<QuizCard {...mockProps} />)
    
    expect(screen.getByText('What is the primary ingredient in Roman concrete?')).toBeInTheDocument()
    expect(screen.getByText('Volcanic ash')).toBeInTheDocument()
    expect(screen.getByText('Portland cement')).toBeInTheDocument()
  })

  it('should show the "Show Result" button after selecting an answer on the final question', () => {
    render(<QuizCard {...mockProps} />)
    
    const correctBtn = screen.getByText('Volcanic ash')
    fireEvent.click(correctBtn)

    expect(screen.getByText('Show Result')).toBeInTheDocument()
  })

  it('should display the final score when "Show Result" is clicked', () => {
    render(<QuizCard {...mockProps} />)
    
    const correctBtn = screen.getByText('Volcanic ash')
    fireEvent.click(correctBtn)

    const resultBtn = screen.getByText('Show Result')
    fireEvent.click(resultBtn)

    expect(screen.getByText('Quiz Finished!')).toBeInTheDocument()

    const scoreElement = screen.getByText('1', { selector: '.score' })
    expect(scoreElement).toBeInTheDocument()
  })

  it('should disable option buttons once an answer has been selected', () => {
    render(<QuizCard {...mockProps} />)
    
    const optionBtn = screen.getByText('Volcanic ash')
    fireEvent.click(optionBtn)

    expect(screen.getByText('Volcanic ash')).toBeDisabled()
    expect(screen.getByText('Portland cement')).toBeDisabled()
  })
})
