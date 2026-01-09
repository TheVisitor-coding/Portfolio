import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SaaSMasterCard from '@/components/bento/SaaSMasterCard'
import ARCard from '@/components/bento/ARCard'
import ArchitectureCard from '@/components/bento/ArchitectureCard'
import AutomationCard from '@/components/bento/AutomationCard'
import CreativeInterfacesCard from '@/components/bento/CreativeInterfacesCard'

// Helper to mock specific sub-components if needed
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
        h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
        p: ({ children, ...props }: any) => <p {...props}>{children} </p>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('Bento Cards', () => {
    describe('SaaSMasterCard', () => {
        it('renders without crashing', () => {
            render(<SaaSMasterCard />)
            // Actual text in component: title="SaaS Engineering"
            expect(screen.getByText(/SaaS Engineering/i)).toBeInTheDocument()
        })
    })

    describe('ARCard', () => {
        it('renders without crashing', () => {
            render(<ARCard />)
            expect(screen.getByText(/Immersive Reality/i)).toBeInTheDocument()
        })
    })

    describe('ArchitectureCard', () => {
        it('renders without crashing', () => {
            render(<ArchitectureCard />)
            expect(screen.getByText(/System Architecture/i)).toBeInTheDocument()
            // Actual text in component: "postgres", "server.ts", "LOGIC"
            expect(screen.getByText(/postgres/i)).toBeInTheDocument()
            expect(screen.getByText(/server.ts/i)).toBeInTheDocument()
        })
    })

    describe('AutomationCard', () => {
        it('renders without crashing', () => {
            render(<AutomationCard />)
            expect(screen.getByText(/Workflow Automation/i)).toBeInTheDocument()
        })
    })

    describe('CreativeInterfacesCard', () => {
        it('renders without crashing', () => {
            render(<CreativeInterfacesCard />)
            expect(screen.getByText(/Creative Interfaces/i)).toBeInTheDocument()
        })
    })
})
