/** @vitest-environment jsdom */
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Dashboard from '../src/components/dashboard/dashboard.jsx'
import { BrowserRouter } from 'react-router-dom'

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
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true
    })

    render(
      <Dashboard onLogOutSuccess={mockOnLogOutSuccess}>
        <div>Some children</div>
      </Dashboard>
    )

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    fireEvent.click(logoutBtn)

    expect(global.fetch).toHaveBeenCalledWith('api/logout', expect.anything())
    
    await vi.waitFor(() => {
      expect(mockOnLogOutSuccess).toHaveBeenCalledWith(null)
    })
  })
})