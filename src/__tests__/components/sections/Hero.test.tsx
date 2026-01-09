import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/sections/Hero'

// Mock split-type
jest.mock('split-type', () => {
    return jest.fn().mockImplementation(() => ({
        chars: [],
        words: [],
        lines: [],
    }))
})

// Mock MagneticButton (UI component)
jest.mock('@/components/ui/MagneticButton', () => {
    return function DummyMagneticButton({ children }: { children: React.ReactNode }) {
        return <div>{children}</div>
    }
})

describe('Hero Section', () => {
    it('renders the main name', () => {
        render(<Hero />)
        const heading = screen.getByText(/MATTÉO ROSSI/i)
        expect(heading).toBeInTheDocument()
    })

    it('renders the job title', () => {
        render(<Hero />)
        const subtitle = screen.getByText(/Creative Developer & Full-stack Architect/i)
        expect(subtitle).toBeInTheDocument()
    })

    it('renders the availability badge', () => {
        render(<Hero />)
        const badge = screen.getByText(/Available for freelance/i)
        expect(badge).toBeInTheDocument()
    })

    it('renders the CTA button', () => {
        render(<Hero />)
        const button = screen.getByText(/Available for work/i)
        expect(button).toBeInTheDocument()
    })
})
