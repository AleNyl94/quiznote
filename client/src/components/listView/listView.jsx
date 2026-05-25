import './listView.css'
import Dashboard from '../dashboard/dashboard.jsx'

export default function ListView({ notes, user, onOpenNote, onDeleteNote, loading }) {

  if (loading) {
    return <p>Loading your notes...</p>
  }


  return (
    <>
    <h1>{user.username}'s notes</h1>
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
            <p className="date">
              {new Date().toLocaleDateString()}
            </p>
            <strong>{note.title}</strong>
            <button 
              className="deleteBtn" 
              onClick={(event) => {
                event.stopPropagation()
                onDeleteNote(note._id || note.id)
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
