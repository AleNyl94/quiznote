import { useEffect, useState } from 'react'
import LoginView from './components/loginView/loginView.jsx'
import SignUpView from './components/signUpView/SignUpView.jsx'
import NoteView from './components/noteView/noteView.jsx'

function App() {

const [currentView, setCurrentView] = useState('login')
const toggleView = () => {
  setCurrentView(prev => prev === 'login' ? 'signup' : 'login')
}

const handleLoginSuccess = () => {
  setCurrentView('notes')
}

useEffect(() => {
  fetch('api/me', { credentials: 'include'})
    .then(res => {
      if(res.ok) setCurrentView('notes')
    })
  }, [])


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