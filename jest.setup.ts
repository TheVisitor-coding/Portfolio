import '@testing-library/jest-dom'

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

// Mock Canvas getContext
if (typeof HTMLCanvasElement !== 'undefined') {
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
        clearRect: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
        fill: jest.fn(),
        arc: jest.fn(),
        save: jest.fn(),
        restore: jest.fn(),
        scale: jest.fn(),
        translate: jest.fn(),
        rotate: jest.fn(),
        measureText: jest.fn(() => ({ width: 0 })),
        fillText: jest.fn(),
    })) as any
}

// Mock generic GSAP
jest.mock('gsap', () => {
    return {
        registerPlugin: jest.fn(),
        to: jest.fn(),
        from: jest.fn(),
        fromTo: jest.fn(),
        set: jest.fn(),
        utils: {
            toArray: jest.fn(() => []),
        },
        context: jest.fn((func) => {
            return {
                revert: jest.fn(),
                add: jest.fn(),
                conditions: {},
                selector: jest.fn(),
            }
        }),
        timeline: jest.fn(() => ({
            to: jest.fn(),
            from: jest.fn(),
            fromTo: jest.fn(),
        })),
    }
})

jest.mock('gsap/ScrollTrigger', () => {
    return {
        ScrollTrigger: {
            create: jest.fn(),
            refresh: jest.fn(),
        }
    }
})
