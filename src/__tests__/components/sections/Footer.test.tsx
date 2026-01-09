import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/sections/Footer'

// Mock MagneticButton
jest.mock('@/components/ui/MagneticButton', () => {
    return function DummyMagneticButton({ children }: { children: React.ReactNode }) {
        return <div>{children}</div>
    }
})

describe('Footer Section', () => {
    it('renders the main tagline', () => {
        render(<Footer />)
        const heading = screen.getByText(/Let's build the impossible/i)
        expect(heading).toBeInTheDocument()
    })

    it('renders the call to action button', () => {
        render(<Footer />)
        const btn = screen.getByText(/Book a Call/i)
        expect(btn).toBeInTheDocument()
    })

    it('renders the copyright text', () => {
        render(<Footer />)
        const copyright = screen.getByText(/© 2025 Emotive Engineering./i)
        expect(copyright).toBeInTheDocument()
    })
})
