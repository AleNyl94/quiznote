import { useEffect, useState } from 'react'
import LoginView from './components/loginView/loginView.jsx'
import SignUpView from './components/signUpView/SignUpView.jsx'
import Dashboard from './components/dashboard/dashboard.jsx'

/**
 *
 */
export function App() {

const [currentView, setCurrentView] = useState('login')
const [user, setUser] = useState(null)

const toggleView = () => {
  setCurrentView(prev => prev === 'login' ? 'signup' : 'login')
}

useEffect(() => {
  const checkSession = async () => {
    try {
      const API_URL = import.meta.env.VITE_ENV_URL || 'http://localhost:3000'
      const response = await fetch(`${API_URL}/me`, { credentials: 'include'})
      
      if(response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        setUser(null)
        setCurrentView('login')
      }
    } catch (err) {
      console.error('No session found', err)
      setUser(null)
      setCurrentView('login')
    }
  }
  checkSession()
}, [])

const handleLoginSuccess = (userData) => {
  setUser(userData.user)
  setCurrentView('dashboard')
}

return (
  <div className="App">
    {currentView === 'login' && (
      <LoginView onLoginSuccess={handleLoginSuccess} toggleView={toggleView}/>
    )}

    {currentView === 'signup' && (
      <SignUpView onSignUpSuccess={() => setCurrentView('login')} toggleView={toggleView}/>
    )}

    {currentView === 'dashboard' && (
      <Dashboard user={user} 
      onLogOutSuccess={() => setCurrentView('login')} />
    )}
  </div>
  )
}

export default App