import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BentoGrid from '@/components/sections/BentoGrid'

// Mock sub-cards to test grid structure in isolation
jest.mock('@/components/bento/SaaSMasterCard', () => () => <div data-testid="saas-card">SaaS Card</div>)
jest.mock('@/components/bento/ARCard', () => () => <div data-testid="ar-card">AR Card</div>)
jest.mock('@/components/bento/ArchitectureCard', () => () => <div data-testid="arch-card">Architecture Card</div>)
jest.mock('@/components/bento/AutomationCard', () => () => <div data-testid="automation-card">Automation Card</div>)
jest.mock('@/components/bento/CreativeInterfacesCard', () => () => <div data-testid="creative-card">Creative Card</div>)

describe('BentoGrid Section', () => {
    it('renders the section title', () => {
        render(<BentoGrid />)
        const heading = screen.getByText(/Digital Services/i)
        expect(heading).toBeInTheDocument()
    })

    it('renders all bento cards', () => {
        render(<BentoGrid />)
        expect(screen.getByTestId('saas-card')).toBeInTheDocument()
        expect(screen.getByTestId('ar-card')).toBeInTheDocument()
        expect(screen.getByTestId('arch-card')).toBeInTheDocument()
        expect(screen.getByTestId('automation-card')).toBeInTheDocument()
        expect(screen.getByTestId('creative-card')).toBeInTheDocument()
    })
})
