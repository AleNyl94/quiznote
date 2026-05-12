import { useState } from 'react'
import Dashboard from '../dashboard/dashboard.jsx'
import './noteView.css'

export default function NoteView() {
  const [noteBody, setNoteBody] = useState('')

  const handleQuiz = async (e) => {
    e.preventDefault()
    console.log('Generating quiz from notes;', noteBody)
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
        <input type="text" placeholder="Untitled note" className="noteTitleInput" />
        <button className="saveBtn" onClick={saveNote}>Save</button>
        <button className="quizBtn" onClick={handleQuiz}>Quiz it!</button>
      </div>
      <textarea
        className="noteBodyArea"
        placeholder="Start writing here..."
        value={noteBody}
        onChange={(e) => setNoteBody(e.target.value)}
        />
    </div>
  )
}