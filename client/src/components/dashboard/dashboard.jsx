import { useState } from 'react'
import NoteView from '../noteView/noteView.jsx'
import ListView from '../listView/listView.jsx'
import './dashboard.css'

/**
 * The dashboard that lets the user navigate in the app.
 * 
 * @returns The dashboard-component with a content-area beneath it, showing either
 * the note or list-view.
 */
export default function Dashboard({ user, onLogOutSuccess }) {
  const [ view, setView ] = useState('note')
  const [ activeNote, setActiveNote ] = useState(null)
  const [notes, setNotes] = useState([])
  /**
   * Toggles the list or note-view.
   * 
   * @param {*} note The note-view.
   */
  const handleOpenNote = (note) => {
    setActiveNote(note)
    setView('note')
  }

  /**
   * Sets a empty note on create note-option
   */
  const handleCreateNew = () => {
    setActiveNote(null)
    setView('note')
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

  const handleSaveNote = async (formData) => {
    try {
      const id = activeNote?._id
      const isEdit = !!id

      const url = isEdit ? `/api/note/${id}` : '/api/note'
      const method = isEdit ? 'PUT' : 'POST'
      
      console.log(`Skickar ${method}-anrop till: ${url} (ID var: ${id})`)

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body
        }),
        credentials: 'include'
      })

      if (response.ok) {
        const savedNote = await response.json()
        if (isEdit) {
        setNotes(prev => prev.map(n => n._id ===  id ? savedNote : n ))
        } else {
          setNotes(prev => [savedNote, ...prev])
        }
  
        setActiveNote(savedNote)
        console.log('Note saved!')
      }
    } catch (err) {
      console.error('Failed to save note', err)
    }
  }

  /**
   * Handling the log-out, making a request to the backend to terminate the session.
   */
  const handleLogOut = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })

      if (response.ok) {
        onLogOutSuccess(null)
      } else {
        console.log('Logging out failed')
      }
    } catch (err) {
      console.log('Unable to connect to the server during logout', err)
    }
  }

  return (
    <div className="dashboard">
      <nav className="navigation">
        <div className="dashboardlist">
          <button className="dashBtn" onClick={handleCreateNew}>New note</button>
          <button className="dashBtn" onClick={ () => setView('list')}>My notes</button>
          <button className="logOutBtn" onClick={handleLogOut}>Log Out</button>
        </div>
      </nav>
      <main className="content-area">
        {view === 'note' && <NoteView activeNote={activeNote} saveNote={handleSaveNote} />}
        {view === 'list' && <ListView notes={notes}  setNotes={setNotes} onOpenNote={handleOpenNote} user={user} onDeleteNote={handleDeleteNote} />}
      </main>
    </div>
  )
}