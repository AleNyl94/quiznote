import { useState } from 'react'

export default function NoteView() {
  const [noteBody, setNoteBody] = useState('')

  const handleQuiz = () => {
     console.log('Generating quiz from notes;', noteBody)
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="Untitled note" className="noteTitleInput" />
        <button className="quizBtn" onClick={handleQuiz}>
        Quiz it!
        </button>
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