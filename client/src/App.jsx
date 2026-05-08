import { useState } from 'react'
import loginView from './components/loginView.jsx'
import notesView from './components/notesView.jsx'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  return (
    <div class="app-container">
    {isLoggedIn ? (
      <dashboard onLogOut={() => setLoggedIn(false)} />
    ) : (
      <LogInView onLoggedIn={() => setLoggedIn(true)}/>
    )}
    </div>
  )
}

export default App