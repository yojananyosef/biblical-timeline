import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TimelineCard from '@/features/timeline/TimelineCard'

const mockEvent = {
  id: '1',
  title: 'Test Event',
  description: 'Test Description',
  verse: 'Test Verse 1:1',
  date: '1000 a.C.',
  year: -1000,
  category: 'Test Category',
}

describe('TimelineCard', () => {
  it('renders event details correctly', () => {
    render(<TimelineCard event={mockEvent} index={0} />)
    
    expect(screen.getByText('Test Event')).toBeInTheDocument()
    expect(screen.getByText('1000 a.C.')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText(/Test Verse 1:1/)).toBeInTheDocument()
  })

  it('has AIDA attributes for accessibility and design hierarchy', () => {
    const { container } = render(<TimelineCard event={mockEvent} index={0} />)
    
    expect(container.querySelector('[data-aida="attention"]')).toBeInTheDocument()
    expect(container.querySelector('[data-aida="interest"]')).toBeInTheDocument()
    expect(container.querySelector('[data-aida="desire"]')).toBeInTheDocument()
    expect(container.querySelector('[data-aida="action"]')).toBeInTheDocument()
  })
})
