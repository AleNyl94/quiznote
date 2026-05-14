import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Dashboard } from '../src/components/dashboard/dashboard.jsx'
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
})