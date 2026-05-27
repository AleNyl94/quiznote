/**
 * Render the form for the log in view. It is the absolut start-point,
 * giving the user a chance to log in. If you dont have an account
 * there is a possibility to sign up.
 */ 
import { useState } from 'react'
import './loginView.css'

/**
 * The login-form for the app.
 * 
 * @param {object} props The component properties.
 * @param {Function} props.toggleView Changes between the login- and signup-forms.
 * @param {Function} props.onLoginSuccess Handles when the user is verified and shows the application.
 * @returns {JSX.Element} View for logging in with email and password, if no account there is a option to sign up.
 */
export default function LoginView({ toggleView, onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')



  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage()

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    const data = await response.json()

    if (response.ok) {
      onLoginSuccess(data)
    } else {
      setErrorMessage(data.message || 'Login failed')
    }
  } catch (err) {
    setErrorMessage('Unable to connect to server', err.message)
    }
  }
  // The form for the login
  return (
  <div className="loginForm">
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    <form onSubmit={handleLogin}>
      <h1>QUIZNOTE</h1>
      <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button className="loginBtn" type="submit">Log in</button>
      <p>No account?</p>
      <button className="signUpBtn" onClick={toggleView}>Sign up</button>
    </form>
  </div>
  )
}