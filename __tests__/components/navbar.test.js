import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

jest.mock('@/components/desktop/DesktopNavbar', () => () => <div data-testid="desktop-navbar" />)
jest.mock('@/components/mobile/MobileNavbar', () => () => <div data-testid="mobile-navbar" />)
jest.mock('@/components/ModeToggler', () => () => <div data-testid="mode-toggler" />)

describe('Navbar', () => {
  it('Renders navigation container', () => {
    render(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('Renders internal components', () => {
    render(<Navbar />)
    expect(screen.getByTestId('desktop-navbar')).toBeInTheDocument()
    expect(screen.getByTestId('mobile-navbar')).toBeInTheDocument()
    expect(screen.getByTestId('mode-toggler')).toBeInTheDocument()
  })

  it('Renders main link text', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /people & weather/i })).toBeInTheDocument()
  })
})
