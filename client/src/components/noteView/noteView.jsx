import { useState } from 'react'
import Dashboard from '../dashboard/dashboard.jsx'
import './noteView.css'

export default function NoteView() {
  const [ noteTitle, setNoteTitle ] = useState('')
  const [noteBody, setNoteBody] = useState('')
  const [showQuiz, setShowQuiz] = useState(false)


  /**
   * Sends the quiz-request
   */
  const handleQuiz = async (e) => {
    e.preventDefault()
    console.log('Generating quiz from notes;', noteBody)
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
  const saveNote = async (noteData) => {
    try {
      const response = await fetch('api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData)
      })

      if (response.ok) {
        const savedNote = await response.json()
        console.log("Note is saved!", savedNote)
    } 
    } catch (error) {
      console.error("Could not save:", error);
    }
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
            value={title} 
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
        data={quizData} 
        onClose={() => setShowQuiz(false)} 
        currentIndex={currentIndex}
        totalQuestions={quizData.length}
        nextQuestion={handleNextQuestion}
      />
    )}
    </div>
  )
}