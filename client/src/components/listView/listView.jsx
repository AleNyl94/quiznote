import { useState, useEffect } from 'react'
import './listView.css'
import Dashboard from '../dashboard/dashboard.jsx'

export default function ListView({ activeNote, setActiveNote, user, onOpenNote }) {
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

  /**
   * Handles the function sending a request to the backend to delete the note.
   *
   * @param {*} noteId The id of the note.
   * @returns Sends you back if answered.
   */
  const handleDeleteNote = async (noteId) => {
    if(!window.confirm("Are you sure you want to delete this?")) {
      return
    }

    try {
      const response = await fetch(`/api/note/${noteId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId))
      }
      if (activeNote?._id == noteId) {
        setActiveNote(null)
        console.log('Note deleted!')
      }
      console.log('Deletion failed')
    } catch (err) {
      console.error('Could not delete note on server', err)
    }
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
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
            <button 
              className="deleteBtn" 
              onClick={(event) => {
                event.stopPropagation()
                handleDeleteNote(note)
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
