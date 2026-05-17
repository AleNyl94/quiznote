import { useState } from 'react'
import './quizCard.css'

export default function QuizCard({ data, currentIndex, totalQuestions, nextQuestion, onClose }) {

  const [ selectedAnswer, setSelectedAnswer ] = useState(null)
  const [ hasAnswered, setHasAnswered ] = useState(false)
  const [ score, setScore ] = useState(0)
  const [ showResults, setShowResults ] = useState(false)

  /**
   * Handling selected answer-action.
   *
   * @param {} option The alternative in the quiz.
   * @returns Stops the logic if answered.
   */
  const handleAnswer = (option) => {
    if (hasAnswered) {
      return
    }
    setSelectedAnswer(option)
    setHasAnswered(true)

    if (option === data.trueAnswer) {
      setScore(prev => prev + 1)
    }
  }

  /**
   * Handling the next question in the quiz.
   */
  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setHasAnswered(false)
      setSelectedAnswer(null)
      nextQuestion()
    } else {
      setShowResults(true)
    }
  }

  if (!data) {
    return null
  }

  /**
   * The quiz card-modal, displaying the question and alternatives.
   */
  return (
    <div className="modal">
      <div className="card-content">
        <button className="closeBtn" onClick={onClose}>X</button>

        {!showResults ? (
        <>
        <h2>QUIZ TIME</h2>
        <p className="question-text">{data.question}</p>
        <div className="options">
          {data.shuffledOptions.map((option, index) => (
            <button
              key={index}
              disabled={hasAnswered}
              className={`optionBtn ${hasAnswered && option === data.trueAnswer ? 'correct' : ''} ${selectedAnswer === option && option !== data.trueAnswer ? 'wrong' : ''}`}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {hasAnswered && (
          <button className="nextBtn" onClick={handleNext}>
            {currentIndex < totalQuestions - 1 ? 'Next Question' : 'Show Result'}
          </button>
        )}
        </>
        ) : (
        <div className="results">
          <h2>Quiz Finished!</h2>
          <p>You got <strong>{score}</strong> out of {totalQuestions} correct.</p>
          <button className="nextBtn" onClick={onClose}>Close</button>
        </div>  
        )}
      </div>
    </div>
  )
}