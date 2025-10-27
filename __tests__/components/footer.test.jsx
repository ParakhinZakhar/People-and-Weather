import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('Renders footer element', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('Contains contact email', () => {
    render(<Footer />)
    expect(screen.getByText(/zoltanriwij@gmail\.com/i)).toBeInTheDocument()
  })

  it('Contains link to GitHub', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /source code/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('github.com'))
  })

  it('Contains link to LinkedIn', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /author/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('linkedin.com'))
  })
})