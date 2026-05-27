/** @vitest-environment jsdom */
import { render, screen, cleanup } from '@testing-library/react'
import { vi, describe, it, expect, afterEach } from 'vitest'
import ListView from '../src/components/listView/listView.jsx'

/**
 * Tests rendering the notes in the list-view.
 */
describe('ListView Component', () => {
  afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  })

  it('Should render the right amount of notes', async () => {
    
    const mockNotes = [
      { 
        id: '1',
        title: 'First note', 
        body: 'Content 1',
        createdAt: new Date().toISOString()
      },
      { 
        id: '2',
        title: 'Second note', 
        body: 'Content 2',
        createdAt: new Date().toISOString()
      }
    ]
    const mockUser = {
      username: 'TestUser',
      notes: mockNotes
    }
    globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockNotes),
    })
    render(<ListView user={mockUser} notes={mockNotes} />)
  
    const note1 = await screen.findByText('First note')
    const note2 = await screen.findByText('Second note')

    expect(note1).toBeInTheDocument()
    expect(note2).toBeInTheDocument()
  })
})

describe('ListView Component', () => {
  afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  })
  it('Should show a message if no notes found', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    })

    render(<ListView notes={[]} user={{ username: 'TestUser' }} />)

    const emptyMessage = await screen.findByText(/No notes yet, create some to see them here!/i)
    expect(emptyMessage).toBeInTheDocument()
  })
})
