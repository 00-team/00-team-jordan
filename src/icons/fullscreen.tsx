import React, { FC, SVGProps } from 'react'

const SharedAttrs: SVGProps<SVGPathElement> = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '32',
}

const Contract: FC = () => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 384'>
        <path
            {...SharedAttrs}
            d='M 240 352 V 240 H 352 M 250.2 250.23 L 368 368 M 144 32 V 144 H 32 M 133.8 133.77 L 16 16 M 352 144 H 240 V 32 M 250.23 133.8 L 368 16 M 32 240 H 144 V 352 M 133.77 250.2 L 16 368'
        />
    </svg>
)

const Expand: FC = () => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 384'>
        <path
            {...SharedAttrs}
            d='M 368 256 V 368 H 256 M 357.8 357.77 L 240 240 M 16 128 V 16 H 128 M 26.2 26.23 L 144 144 M 256 16 H 368 V 128 M 357.77 26.2 L 240 144 M 128 368 H 16 V 256 M 26.23 357.8 L 144 240'
        />
    </svg>
)

export { Contract, Expand }
