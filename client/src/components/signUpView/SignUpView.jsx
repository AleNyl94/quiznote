/**
 * Render the sign up form, retrieving the credentials and sends them to the backend.
 */ 
import { useState } from 'react'
import './signUpView.css'

export default function SignUpView({ onSignUpSuccess, toggleView }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setError] = useState(null)



  /**
   * Handles the sign up, connecting the submit-button to the
   * signup-request, 
   * @param {*} e 
   * @returns When signup is successful it returns you to the login-form again.
   */
  const handleSignup = async (e) => {
    e.preventDefault()
    setError(null)

    try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })

    const data = await response.json()

    if (response.ok) {
      onSignUpSuccess()
      return
    }
    
    if (response.status === 409 || response.status === 400) {
      setError(data.error || 'User already exists, try again')
    } else {
      setError('Something went wrong on the server')
    }
  } catch (err) {
    setError('Could not connect to the server', err)
    }
  }

  /**
   * The form for signing up an account.  
   */ 
  return (
  <div className="signupForm">
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    <form onSubmit={handleSignup}>
      <h2>Sign up your account</h2>
      <input type="text" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button className="submitBtn" type="submit">Register account </button>
      <span onClick={toggleView}>Back to logging in</span>
    </form>
  </div>
  )
}