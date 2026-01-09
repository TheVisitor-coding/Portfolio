import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import MagneticButton from '@/components/ui/MagneticButton'

describe('MagneticButton', () => {
    it('renders children correctly', () => {
        render(
            <MagneticButton>
                <button>Click me</button>
            </MagneticButton>
        )
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('renders without crashing on mouse events', () => {
        render(
            <MagneticButton>
                <button>Hover me</button>
            </MagneticButton>
        )
        // Select the container div
        const btnText = screen.getByText('Hover me')
        const btnContainer = btnText.parentElement as HTMLElement

        // Mock getBoundingClientRect
        btnContainer.getBoundingClientRect = jest.fn(() => ({
            width: 100,
            height: 50,
            top: 0,
            left: 0,
            bottom: 50,
            right: 100,
            x: 0,
            y: 0,
            toJSON: () => { }
        }))

        // Fire events
        fireEvent.mouseMove(btnContainer, { clientX: 50, clientY: 25 })
        fireEvent.mouseLeave(btnContainer)

        expect(btnText).toBeInTheDocument()
    })
})
