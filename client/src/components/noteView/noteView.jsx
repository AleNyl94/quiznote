import { useState } from 'react'
import './noteView.css'
import QuizCard from '../quizCard/quizCard.jsx'

/**
 * The function for the note-creation view. 
 */
export default function NoteView({ activeNote, saveNote }) {
  const [noteTitle, setNoteTitle] = useState(activeNote?.title || '')
  const [noteBody, setNoteBody] = useState(activeNote?.body || '')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizTasks, setQuizTasks] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  /**
   * Sends the quiz-request
   */
  const handleQuiz = async () => {
    try {
      const noteId = activeNote?._id

      if (!noteId) {
        alert("Save the note first!")
        return
      }

      const response = await fetch(`/api/note/quiz/${noteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: noteBody }),
        credentials: 'include'
      })

      const data = await response.json()

      const tasksArray = data.task || data.tasks || data

      if (!Array.isArray(data)) {
        console.error("Hittade ingen array att mappa igenom! data var:", tasksArray)
        return
      }

      const mappedTasks = data.map(item => {
      return {
        question: item.question,
        correctAnswer: item.true,
        shuffledOptions: [item.true, item.false].sort(() => Math.random() - 0.5)
      }
    })

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
    setShowQuiz(false)
  }

  /**
   * Function for saving the note
   */
  const handleSave = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }
    saveNote({ 
      title: noteTitle, 
      body: noteBody })
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
        <div className="noteTop">
          <input type="text" 
            value={noteTitle} 
            placeholder="Untitled note" 
            className="noteTitleInput" 
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        <button className="saveBtn" onClick={handleSave}>Save</button>
        <button className="quizBtn" onClick={handleQuiz}>Quiz it!</button>
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
        onClose={toggleModal} 
        currentIndex={currentIndex}
        totalQuestions={quizTasks.length}
        nextQuestion={handleNextQuestion}
      />
    )}
    </div>
  )
}