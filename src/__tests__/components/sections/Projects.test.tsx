import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Projects from '@/components/sections/Projects'

describe('Projects Section', () => {
    it('renders the section title', () => {
        render(<Projects />)
        const heading = screen.getByText(/Selected Works/i)
        expect(heading).toBeInTheDocument()
    })

    it('renders project cards', () => {
        render(<Projects />)
        const project1 = screen.getByText(/E-Commerce SaaS Core/i)
        const project2 = screen.getByText(/Immersive AR Viewer/i)
        const project3 = screen.getByText(/Financial Dashboard/i)

        expect(project1).toBeInTheDocument()
        expect(project2).toBeInTheDocument()
        expect(project3).toBeInTheDocument()
    })
})
