import React, { SVGProps } from 'react'

const ClockHands: SVGProps<SVGLineElement> = {
    x1: '30',
    y1: '30',
    y2: '30',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
}

const CHandsAnim = {
    attributeName: 'transform',
    type: 'rotate',
    from: '0 30 30',
    to: '360 30 30',
    repeatCount: 'indefinite',
}

export default () => (
    <svg className='loading' viewBox='0 0 60 60'>
        <circle
            r='28'
            stroke='currentColor'
            strokeWidth='2'
            cx='30'
            cy='30'
            fill='#0000'
        />
        <circle r='1.5' fill='currentColor' cx='30' cy='30' />

        <line x2='55' {...ClockHands}>
            <animateTransform dur='2s' {...CHandsAnim} />
        </line>
        <line x2='50' {...ClockHands}>
            <animateTransform dur='8s' {...CHandsAnim} />
        </line>
    </svg>
)
