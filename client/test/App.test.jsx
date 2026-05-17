/** @vitest-environment jsdom */
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { App } from '../src/App.jsx'

globalThis.fetch = vi.fn()

/**
 * Tests the login to note-functionality.
 */
describe('App Component Navigation', () => {
  it('Should display loginView as standard', () => {
    fetch.mockResolvedValueOnce({ ok: false })
    
    render(<App />)
    expect(screen.getByPlaceholderText(/your email/i) || screen.getByText(/login/i)).toBeInTheDocument()
  })

  it('If successful, navigate to notes', async () => {
    fetch.mockReset()

    fetch.mockImplementation((url) => {
    if (url.includes('api/me')) {
      return Promise.resolve({ ok: false })
    }
    if (url.includes('api/login')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ username: 'TestUser' })
      })
    }
      return Promise.reject(new Error('Unknown API call'))
    })

    render(<App />)

    const emailInput = await screen.findByPlaceholderText(/your email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)

    fireEvent.change(emailInput), { target: { value: 'test@test.com' } }
    fireEvent.change(passwordInput), { target: { value: 'password' } }

    const loginBtn = screen.getByRole('button', { name: /log in/i })
    fireEvent.submit(loginBtn)
    
    await waitFor(() => {
      screen.debug()
      expect(screen.getByText(/Save/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})