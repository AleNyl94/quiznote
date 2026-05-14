import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ListView } from '../src/components/listView/listView.jsx'

describe('ListView Component', () => {
  it('Should show a message if no notes found', async () => {
    render(<ListView notes={[]} />)
    expect(screen.getByText(/No notes yet, create some to see them here!/i)).toBeInTheDocument()
  })
})