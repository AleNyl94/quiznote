import { useState } from 'react'
import { useMemo } from 'react' 

export function QuizCard(data, currentIndex, totalQuestions, nextQuestion) {

  const [ selectedAnswer, setSelectedAnswer ] = useState(null)
  const [ hasAnswered, setHasAnswered ] = useState(null)

  const handleAnswer = (option) => {
    if (hasAnswered) {
      return
    }
    setSelectedAnswer(option)
    setHasAnswered(true)
  }
  
  // Shuffles the answers so the correct answer and vice versa 
  // does not show in the same box for every question
  const shuffledOptions =React.useMemo(() => {
    const options = [data.trueAnswer, data.falseAnswer]
    return options.sort(() => Math.random() - 0.5)
  }, [data])

  /**
   * The quiz card-modal, 
   */
  return (
    <div className="modal">
      <div className="card-content">
        <button className="closeBtn">X</button>
        <h2>QUIZ TIME</h2>
        <p className="question-text">{data.question}</p>
        <div className="options">
          {shuffledOptions.map((option, index) => (
            <button
              disabled={hasAnswered}
              className={`optionBtn ${hasAnswered && option === data.trueAnswer ? 'correct' : ''} ${selectedAnswer === option && option !== data.trueAnswer ? 'wrong' : ''}`}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {hasAnswered && (
          <button className="nextBtn" onClick={nextQuestion}>
            {currentIndex < totalQuestions - 1 ? 'Next Question' : 'Show Result'}
          </button>
        )}
      </div>
    </div>
  )
}