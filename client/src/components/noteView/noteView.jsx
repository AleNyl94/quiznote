import { useState, useEffect } from 'react'
import './noteView.css'
import QuizCard from '../quizCard/quizCard.jsx'

/**
 * The function for the note-creation view. 
 */
export default function NoteView({ activeNote, saveNote }) {
  const [ noteTitle, setNoteTitle ] = useState('')
  const [noteBody, setNoteBody] = useState('')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizTasks, setQuizTasks] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (activeNote) {
      setNoteTitle(activeNote.title || '')
      setNoteBody(activeNote.body || '')
    }
  }, [activeNote])

  /**
   * Sends the quiz-request
   */
  const handleQuiz = async () => {
    try {
      const noteId = activeNote?._id || activeNote?.id
      const response = await fetch(`/api/note/generate-quiz/${noteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: noteBody }),
        withCredentials: 'true'
      })

      const data = await response.json()

      const mappedTasks = data.task.map(item => {
      const options = [item.trueAnswer, item.falseAnswer];
      return {
        question: item.question,
        shuffledOptions: options.sort(() => Math.random() - 0.5) 
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
    const noteId = activeNote?._id || activeNote?.id || undefined

    console.log('NoteView skickar till dashboard:', noteId, noteTitle, noteBody)

    saveNote({ id: noteId, title: noteTitle, body: noteBody })
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