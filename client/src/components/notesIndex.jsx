/**
 * Render the form for the log in view. It is the absolut start-point,
 * giving the user a chance to log in. If you dont have an account
 * there is a possibility to sign up.
 */

function loginView({ onLoggedIn }) {
  // TODO handle the login submit
  const handleLogin = async () => {
    onLoggedIn()
  }

    // The form for the login
  return (
  <div class="loginForm">
    <h1>Welcome to QuizNote</h1>
    <input type="email" placeholder="Din e-post"/>
    <input type="password"/>
    <button onClick={handleLogin}>Logga in</button>
    <p>Inget konto?</p><a>Registrera dig här!</a>
  </div>
  )
}