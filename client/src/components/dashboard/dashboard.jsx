import { useState } from 'react'

/**
 * The dashboard that lets the user navigate in the app.
 * 
 * @returns The dashboard-component with a content-area beneath it, showing either
 * the note or list-view.
 */
export default function Dashboard( user, onLogOutSuccess ) {
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
      <nav>
        <div className="dashboardlist">
          <button className="dashBtn" onClick={ () => setView('note')}>New note</button>
          <button className="dashBtn" onClick={ () => setView('list')}>My notes</button>
          <button className="logOutBtn">Log Out</button>
        </div>
      </nav>
      <main className="content-area">
        {view === 'list' ? (
          <ListView onNoteClick={handleOpenNote} />
        ) : (
        <NoteView 
          note={activeNote} 
          onBack={() => setView('list')} 
        />
      )}
    </main>
    </div>
  )
}