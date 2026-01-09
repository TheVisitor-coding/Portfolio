import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'

// Mock all child components to test Page in isolation
jest.mock('@/components/layout/SmoothScroll', () => {
    return function DummySmoothScroll({ children }: { children: React.ReactNode }) {
        return <div>{children}</div>
    }
})
jest.mock('@/components/sections/Hero', () => () => <div data-testid="hero">Hero</div>)
jest.mock('@/components/sections/Tools', () => () => <div data-testid="tools">Tools</div>)
jest.mock('@/components/sections/BentoGrid', () => () => <div data-testid="bento">BentoGrid</div>)
jest.mock('@/components/sections/Projects', () => () => <div data-testid="projects">Projects</div>)
jest.mock('@/components/sections/Footer', () => () => <div data-testid="footer">Footer</div>)

describe('Home Page', () => {
    it('renders without crashing', () => {
        render(<Page />)
        // Check for mocked sections
        expect(screen.getByTestId('hero')).toBeInTheDocument()
        expect(screen.getByTestId('bento')).toBeInTheDocument()
        expect(screen.getByTestId('tools')).toBeInTheDocument()
    })
})
