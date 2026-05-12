import { useState } from 'react'
import '../dashboard/dashboard.jsx'

export default function ListView() {
  const 

  return (
    <div className="list">
    <ul>
      {notes.map((note) => (
        <li key={note.id} className="note-item">
          {note.title}
        </li>
      ))}
    </ul>
    </div>
  )
}
