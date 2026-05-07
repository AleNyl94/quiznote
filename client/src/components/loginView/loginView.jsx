/**
 * Render the form for the log in view. It is the absolut start-point,
 * giving the user a chance to log in. If you dont have an account
 * there is a possibility to sign up.
 */ 
import { useState } from 'react'
import './loginView.css'

export default function LoginView({ toggleView, onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')



  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage()

  try {
    const response = await fetch('api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    const data = await response.json()

    if (response.ok) {
      onLoginSuccess(data.user)
    } else {
      setErrorMessage(data.message || 'Login failed')
    }
  } catch (err) {
    setErrorMessage('Unable to connect to server', err.message)
    }
  }
  // The form for the login
  return (
  <div class="loginForm">
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    <form onSubmit={handleLogin}>
      <h1>QuizNote</h1>
      <h3>Log in:</h3>
      <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button class="loginBtn" onClick={handleLogin}>Log in</button>
      <p>No account?</p>
      <button class="signUpBtn" onClick={toggleView}>Sign up</button>
    </form>
  </div>
  )
}