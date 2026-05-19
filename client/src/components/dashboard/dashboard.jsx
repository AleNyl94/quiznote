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
export default function Dashboard({ noteData, user, onLogOutSuccess }) {
  const [ view, setView ] = useState('note')
  const [ activeNote, setActiveNote ] = useState(null)

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

  const handleSaveNote = async (noteData) => {
    try {
      const isEdit = !!(noteData.id && noteData.id !== 'null' && noteData.id !== 'undefined')

      const url = isEdit ? `/api/note/${noteData.id}` : '/api/note'
      const method = isEdit ? 'PUT' : 'POST'
      
      console.log(`Skickar ${method}-anrop till: ${url} (ID var: ${noteData.id})`)

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: noteData.title,
          body: noteData.body
        }),
        credentials: 'include'
      })

      if (response.ok) {
        const savedNote = await response.json()
        setActiveNote(savedNote)
        console.log('Note saved!')
      } else {
        console.error('Servern svarade med felkod:', response.status)
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
      const response = await fetch('api/logout', {
        method: 'POST',
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
        {view === 'list' && <ListView onOpenNote={handleOpenNote} user={user} />}
      </main>
    </div>
  )
}