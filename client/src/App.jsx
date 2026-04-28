import { useState } from 'react'
import LoginView from './components/LoginView'
import SignUpView from './components/SignUpView'

function App() {

const [currentView, setCurrentView] = useState('login')
const toggleView = () => {
  if (currentView === LoginView) {
  setCurrentView('signup')
  } else {
    setCurrentView('login')
  }
}


  return (
    <div className="App">
      {currentView === 'login' ? (
        <LoginView
          onLoginSuccess={() => console.log('Logged in!')}
          toggleView={toggleView}
          />
      ) : (
        <SignUpView
        onSignUpSuccess={() => setCurrentView('login')}
        toggleView={toggleView}
        />
      )}
    </div>
  )
}

export default App