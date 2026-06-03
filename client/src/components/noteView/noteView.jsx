import { useState } from 'react'
import './noteView.css'
import Notification from '../notification/notification.jsx'
import QuizCard from '../quizCard/quizCard.jsx'

/**
 * The function for the note-creation view.
 *
 * @param {object} props The component properties.
 * @param {object} props.activeNote The current note.
 * @param {Function} props.saveNote Callback function to save the current note data.
 * @returns {JSX.Element} View for the note creation, where a user can name, create, quiz and save a note.
 */
export default function NoteView({ activeNote, saveNote }) {
  const [errorMessage, setErrorMessage] = useState('')
  const [noteTitle, setNoteTitle] = useState(activeNote?.title || '')
  const [noteBody, setNoteBody] = useState(activeNote?.body || '')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizTasks, setQuizTasks] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  /**
   * Sends the quiz-request
   */
  const handleQuiz = async () => {
    try {
      const noteId = activeNote?._id

      if (noteBody.trim().length < 100) {
        setErrorMessage('You need at least 100 characters of text to generate a quiz.')
        setTimeout(() => setErrorMessage(''), 4000)
        return
      }

      if (!noteId) {
        setErrorMessage('Save the note first!')
        setTimeout(() => setErrorMessage(''), 3000)
        return
      }

      const response = await fetch(`${API_URL}/api/note/quiz/${noteId}`, {
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
   * @param {object} [e] - Click for the button saving the note via request. 
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
   * @param {object} [e] - Optional click event.
   */
  return (
    <div className="content">
      <Notification message={errorMessage} type="error" />
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