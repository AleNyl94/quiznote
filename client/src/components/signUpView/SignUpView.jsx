/**
 * Render the sign up form, retrieving the credentials and sends them to the backend.
 */ 
import { useState } from 'react'
import './signUpView.css'
import Notification from '../notification/notification.jsx'

/**
 * The signup-form.
 * 
 * @param {object} props The component properties.
 * @param {Function} props.onSignUpSuccess Handles the successful signup after request.
 * @param {Function} props.toggleView Toggles between the login and signup-form.
 * @returns {JSX.Element} The form for signing up a user.
 */
export default function SignUpView({ onSignUpSuccess, toggleView }) {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const API_URL = import.meta.env.VITE_ENV_URL || 'http://localhost:3000'

  /**
   * Handles the sign up, connecting the submit-button to the
   * signup-request.
   *
   * @param {object} [e] - Click event for requesting the sign up to the database. 
   * @returns When signup is successful it returns you to the login-form again.
   */
  const handleSignup = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    try {
    const response = await fetch(`${API_URL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })

    if (response.ok) {
      onSignUpSuccess('User is registered! You can now log in.')
      setSuccessMessage('User is registered!')
      return
    }
    
    if (response.status === 409 || response.status === 400) {
      setErrorMessage('User already exists')
    } else {
      setErrorMessage('Something went wrong on the server')
    }
  } catch (err) {
    setErrorMessage('Could not connect to server')
    console.error('Could not connect to the server', err)
    }
  }

  /**
   * The form for signing up an account.  
   *
   * @param {object} [e] - Click event for triggering the function for signing up.
   */ 
  return (
  <div className="signupForm">
    <Notification message={successMessage} type="success" />
    <Notification message={errorMessage} type="error" />
    <form onSubmit={handleSignup}>
      <h2>Sign up your account</h2>
      <input type="text" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password"/>
      <button className="submitBtn" type="submit">Register account </button>
      <span onClick={toggleView}>Back to logging in</span>
    </form>
  </div>
  )
}