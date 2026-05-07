import { useState } from 'react'

export default function Dashboard() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(true)

  return (
    <div className="dashboard">
      { isMenuOpen && (
        <aside className="side-menu">
          <button onClick={() => setIsMenuOpen(false)}>Hide menu</button>
          <nav>
            <ul>
              <li>New note</li>
              <li>My notes</li>
              <li>Log out</li>
            </ul>
          </nav>
        </aside>
      )}
      <main className="main-content">
        {!isMenuOpen && <button onClick={() => setIsMenuOpen(true)}>Show menu</button>}
        <NoteView />
      </main>
    </div>
  )
}