import React from 'react'
import { render, screen } from '@testing-library/react'
import RootLayout from '@/app/layout'

jest.mock('@/components/Navbar', () => () => <div data-testid="navbar" />)
jest.mock('@/components/Footer', () => () => <div data-testid="footer" />)
jest.mock('@/providers/ThemeProvider', () => ({
  __esModule: true,
  ThemeProvider: ({ children }) => <div data-testid="theme">{children}</div>,
  default: ({ children }) => <div data-testid="theme">{children}</div>,
}))

function LayoutWrapper({ children }) {
  const layout = RootLayout({ children })
  return layout.props.children.props.children
}

describe('RootLayout (Next.js)', () => {
  it('Renders Navbar and Footer', () => {
    render(<LayoutWrapper>Test children</LayoutWrapper>)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('Renders children inside layout', () => {
    render(
      <LayoutWrapper>
        <div data-testid="child">Child content</div>
      </LayoutWrapper>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('Wraps content in ThemeProvider', () => {
    render(<LayoutWrapper>Child</LayoutWrapper>)
    expect(screen.getByTestId('theme')).toBeInTheDocument()
  })
})
