/** @vitest-environment jsdom */
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import SignUpView from '../src/components/signUpView/SignUpView.jsx'

/**
 * Tests the signup-form, mocking registering a user
 */
describe('SignUpView Component', () => {
  
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('should render the signup form correctly', () => {
    render(<SignUpView />)
    
    expect(screen.getByPlaceholderText(/your username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Register account/i })).toBeInTheDocument()
  })

  it('should call the signup API with the correct data', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'User created' })
    })

    render(<SignUpView 
      onSignUpSuccess={vi.fn()}
      toggleView={vi.fn()}
    />)

    const usernameInput = screen.getByPlaceholderText(/your username/i)
    const emailInput = screen.getByPlaceholderText(/your email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const signupBtn = screen.getByRole('button', { name: /register account/i })

    fireEvent.change(usernameInput, { target: { value: 'username' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    fireEvent.click(signupBtn)

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith('http://localhost:3000/api/signup', expect.objectContaining({
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'username', 
          email: 'test@example.com', 
          password: 'password123' 
        })
      }))
    })
  })
})