import { useEffect, useState } from 'react'
import LoginView from './components/loginView/loginView.jsx'
import SignUpView from './components/signUpView/SignUpView.jsx'
import NoteView from './components/noteView/noteView.jsx'
import Dashboard from './components/dashboard/dashboard.jsx'

export function App() {

const [currentView, setCurrentView] = useState('login')
const [user, setUser] = useState(null)

const toggleView = () => {
  setCurrentView(prev => prev === 'login' ? 'signup' : 'login')
}

useEffect(() => {
  fetch('api/me', { credentials: 'include'})
    .then(res => {
      if(res.ok) return res.json()
      throw new Error('Not logged in')
    })
    .then(userData => {
      setUser(userData)
      setCurrentView('notes')
    })
    .catch(() => {
      setUser(null)
      setCurrentView('login')
    })
  }, [])

const handleLoginSuccess = (userData) => {
  setUser(userData)
  setCurrentView('notes')
}
return (
  <div className="App">
    {currentView === 'login' && (
      <LoginView onLoginSuccess={handleLoginSuccess} toggleView={toggleView}/>
    )}

    {currentView === 'signup' && (
      <SignUpView onSignUpSuccess={() => setCurrentView('login')} toggleView={toggleView}/>
    )}

    {currentView === 'notes' && (
      <NoteView onLogOut={() => setCurrentView('login')}/>
    )}
  </div>
  )
}

export default App