import { useState, useEffect } from 'react'
import './listView.css'
import Dashboard from '../dashboard/dashboard.jsx'

export default function ListView({ user, onOpenNote, onDeleteNote }) {
  const [notes, setNotes] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try { 
        const response = await fetch('/api/note/list', {
          credentials: 'include'
        })
      if (response.ok) {
        const data = await response.json()
        setNotes(data)
      }
      } catch (err) {
        console.log('Could not fetch notes', err)
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  if (loading) {
    return <p>Loading your notes...</p>
  }


  return (
    <>
    <h1>{user?.username}'s notes</h1>
    <div className="list">
      {notes.length === 0 ? (
        <p>No notes yet, create some to see them here!</p>
      ) : (
      <ul>
        {notes.map((note) => (
          <li 
            key={note._id || note.id} 
            className="note-item"
            onClick={() => onOpenNote(note)}
            style={{ cursor: 'pointer' }}
          >
            <strong>{note.title}</strong>
            <span className="date">
              {new Date().toLocaleDateString()}
            </span>
            <button 
              className="deleteBtn" 
              onClick={(event) => {
                event.stopPropagation()
                onDeleteNote(note)
              }}>
                Delete
            </button>
          </li>
        ))}
      </ul>
      )}
    </div>
    </>
  )
}
