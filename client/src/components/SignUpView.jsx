/**
 * Render the sign up form, retrieving the credentials and sends them to the backend.
 */ 
import { useState } from 'react'

export default function SignUpView({ onSignUpSuccess, toggleView }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setError] = useState(null)



  const handleSignup = async (e) => {
    e.preventDefault()
    setError(null)

    const response = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })

    const data = await response.json()

    if (response.status === 409) {
      setError('User already exists, try again')
    } else if (!response.ok){
      setError(data.message || 'Something went wrong on the server')
    } else {
      onSignUpSuccess()
    }
  }
  // The form for signing up an account
  return (
  <div className="signupForm">
    <h3>Sign up your account</h3>
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    <form onSubmit={handleSignup}>
      <input type="text" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button type="submit">Register account </button>
    </form>
  </div>
  )
}