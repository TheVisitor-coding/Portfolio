import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Tools from '@/components/sections/Tools'

describe('Tools Section', () => {
    it('renders the section title', () => {
        render(<Tools />)
        const heading = screen.getByText(/Mon Arsenal/i)
        expect(heading).toBeInTheDocument()
    })
})
