/** @vitest-environment jsdom */
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import Dashboard from '../src/components/dashboard/dashboard.jsx'
import { BrowserRouter } from 'react-router-dom'

vi.stubGlobal('confirm', () => true)

describe('Dashboard Component', () => {
  it('Should render the dashboard', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should call onLogOutSuccess when log out is successful', async () => {
    const mockOnLogOutSuccess = vi.fn()
    
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true
    })

    render(
      <BrowserRouter>
        <Dashboard onLogOutSuccess={mockOnLogOutSuccess}>
          <div>Some children</div>
        </Dashboard>
      </BrowserRouter>
    )

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    fireEvent.click(logoutBtn)

    expect(globalThis.fetch).toHaveBeenCalledWith('http://localhost:3000/api/logout', expect.anything())
    
    await vi.waitFor(() => {
      expect(mockOnLogOutSuccess).toHaveBeenCalledWith(null)
    })
  })
})