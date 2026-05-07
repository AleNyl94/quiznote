/**
 * Render the form for the log in view. It is the absolut start-point,
 * giving the user a chance to log in. If you dont have an account
 * there is a possibility to sign up.
 */ 
import { useState } from 'react'

export default function LoginView({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')



  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage()

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (response.ok) {
      onLoginSuccess(data.user)
    } else {
      setErrorMessage(data.message || 'Login failed')
    }
  } catch (err) {
    setErrorMessage('Unable to connect to server')
    }
  }
  // The form for the login
  return (
  <div class="loginForm">
    <h1>Welcome to QuizNote</h1>
    <h3>Log in:</h3>
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={handleLogin}>Log in</button>
    </form>
    <p>No account?</p><span class="signUpBtn"> register here!</span>
  </div>
  )
}