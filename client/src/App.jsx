import { useState } from 'react'
import LoginView from './components/loginView/loginView.jsx'
import SignUpView from './components/signUpView/signUpView.jsx'

function App() {

const [currentView, setCurrentView] = useState('login')
const toggleView = () => {
  if (currentView === 'login') {
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