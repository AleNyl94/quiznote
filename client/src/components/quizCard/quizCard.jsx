import { useState } from 'react'

export function QuizCard() {
  
  // Shuffles the answers so the correct answer and vice versa 
  // does not show in the same box for every question
  const shuffle =React.useMemo(() => {
    const options = [data.trueAnswer, falseAnswer]
    return options.sort(() => Math.random() - 0.5)
  }, [data])
  return (
    <div className="modal">
      <div className="card-content">
        <button className="closeBtn">X</button>
        <h2>QUIZ TIME</h2>
        <p className="question-text">{data.question}</p>
        <div className="options">

        </div>
      </div>
    </div>
  )
}