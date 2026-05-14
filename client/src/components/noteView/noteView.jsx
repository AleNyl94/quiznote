import { useState } from 'react'
import { Dashboard } from '../dashboard/dashboard.jsx'
import './noteView.css'
import { QuizCard } from '../quizCard/quizCard.jsx'

export default function NoteView() {
  const [ noteTitle, setNoteTitle ] = useState('')
  const [noteBody, setNoteBody] = useState('')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizTasks, setQuizTasks] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  /**
   * Sends the quiz-request
   */
  const handleQuiz = async (e) => {
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: noteBody })
      })
      const data = await response.json()

      const mappedTasks = data.task.map(item => ({
        question: item.question,
        trueAnswer: item.trueAnswer,
        falseAnswer: item.falseAnswer
      }))
    setQuizTasks(mappedTasks)
    setCurrentIndex(0)
    setShowQuiz(true)
    } catch (err) {
      console.error('Could not generate quiz', err)
    }
  }

  /**
   * Toggles the quiz display, resets the score if closed.
   */
  const toggleModal = () => {
    setShowQuiz(false);
    currentIndex === 0 
  }

  /**
   * Function for saving the note
   */
  const handleSave = () => {
    saveNote({ title: noteTitle, content: noteBody })
  }

  /**
   * Sends the user to the next question from the question-battery.
   */
  const handleNextQuestion = () => {
    setCurrentIndex(prev => prev + 1)
  }

  /**
   * The view for the note, allowing the user to fill in the text-area with notes,
   * saving it or making a quiz.
   */
  return (
    <div className="content">
      <Dashboard />
        <div className="noteTop">
          <input type="text" 
            value={noteTitle} 
            placeholder="Untitled note" 
            className="noteTitleInput" 
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        <button className="saveBtn" onClick={handleSave}>Save</button>
        <button className="quizBtn" onClick={() => setShowQuiz(true)}>Quiz it!</button>
      </div>
      <textarea
        className="noteBodyArea"
        placeholder="Start writing here..."
        value={noteBody}
        onChange={(e) => setNoteBody(e.target.value)}
        />
        {showQuiz && (
      <QuizCard 
        data={quizTasks[currentIndex]} 
        onClose={() => setShowQuiz(false)} 
        currentIndex={currentIndex}
        totalQuestions={quizTasks.length}
        nextQuestion={handleNextQuestion}
      />
    )}
    </div>
  )
}