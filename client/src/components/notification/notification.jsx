import React from 'react'
import './notification.css'

/**
 * A box that displays an error if occured in the app.
 * 
 * @param {object} props The component props.
 * @param {object} props.message The message expressing the error from the app to the user.
 * @param {object} props.type What kind of message in the notification styles it differently.
 * @returns {JSX.Element} The error-message box.
 */
const Notification = ({ message, type = 'error' }) => {
  if (!message) return null

  const className = type === 'success' ? 'notification successbox' : 'notification errorbox'

  return (
  <div className={className} role="alert">
    <p>{message}</p>
  </div>
  )
}
export default Notification