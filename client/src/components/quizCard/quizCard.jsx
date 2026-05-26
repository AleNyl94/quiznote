import { useState } from 'react'
import './quizCard.css'

/**
 * Component for the quiz-card.
 * @param {*} props The porperties sent from the component.
 * @returns The user to the noteview.
 */
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

    if (option === data.correctAnswer) {
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
    <div className="modalOverlay">
      <div className="modal">
        <button className="closeBtn" onClick={onClose}>X</button>
        <div className="card-content">

          {!showResults ? (
          <>
          <h2 className="title">QUIZ TIME</h2>
          <strong className="question-text">{data.question}</strong>
          <div className="options">
            {data.shuffledOptions.map((option, index) => (

              <button
                key={index}
                disabled={hasAnswered}
                className={`optionBtn ${
                  hasAnswered && option === data.correctAnswer ? 'correct' : ''
                } ${ hasAnswered && option === selectedAnswer && option !== data.correctAnswer ? 'wrong' : ''
                }`}
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
            <h3>You got: </h3>
              <div className="scoreboard">
                <h3 className="score">{score}</h3><h3 className="snedstreck">/</h3><h3 className="totalquestions">{totalQuestions}</h3>
              </div>
            <button className="nextBtn" onClick={onClose}>Close</button>
          </div>  
          )}
        </div>
      </div>
    </div>
  )
}