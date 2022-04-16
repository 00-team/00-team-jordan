import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'

// style
import './style.scss'

// player
import { Player } from '../lib'

import demo from './demo.mp4'

const App: FC = () => {
    return (
        <div className='app'>
            <Player src={demo} />
        </div>
    )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
