/** @vitest-environment jsdom */
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from '../src/App.jsx'

global.fetch = vi.fn()

describe('App Component Navigation', () => {
  it('Should display loginView as standard', () => {
    fetch.mockResolvedValueOnce({ ok: false })
    
    render(<App />)
    expect(screen.getByPlaceholderText(/username/i) || screen.getByText(/login/i)).toBeInTheDocument()
  })

  it('If successful, navigate to notes', async () => {
    fetch.mockResolvedValueOnce({ ok: true })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Save/i)).toBeInTheDocument()
    })
  })
})