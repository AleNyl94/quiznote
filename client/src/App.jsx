import { useEffect, useState } from 'react'
import LoginView from './components/loginView/loginView.jsx'
import SignUpView from './components/signUpView/signUpView.jsx'
import NoteView from './components/noteView/noteView.jsx'

function App() {

useEffect(() => {
  fetch('/me', { credentials: 'include'})
    .then(res => {
      if(res.ok) setCurrentView('notes')
    })
  }, [])

const [currentView, setCurrentView] = useState('login')
const toggleView = () => {
  setCurrentView(prev => prev === 'login' ? 'signup' : 'login')
  }

const handleLoginSuccess = () => {
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