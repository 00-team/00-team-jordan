import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'

// style
import './style.scss'

// player
import { Player, Source } from '..'

import green from './videos/green.mp4'
import red from './videos/red.mp4'
import blue from './videos/blue.mp4'

const source: Source = [green, red, blue]

const App: FC = () => {
    return (
        <div className='app'>
            <Player source={source} />
        </div>
    )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
