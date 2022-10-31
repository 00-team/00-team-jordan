import React, { FC, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

import './style.scss'

import duck_144p from './videos/144p.mp4'
import duck_240p from './videos/240p.mp4'
import duck_360p from './videos/360p.nosound.mp4'
import duck_480p from './videos/480p.mp4'
import duck_720p from './videos/original.mp4'

import { Player, Source } from '../lib'

const source: Source = [
    {
        label: '144p',
        url: duck_144p,
    },
    {
        label: '240p',
        url: duck_240p,
    },
    {
        label: '360p No Sound',
        url: duck_360p,
    },
    {
        label: '480p',
        url: duck_480p,
    },
    {
        label: '720p',
        url: duck_720p,
    },
]

const App: FC = () => {
    const [mount, setMount] = useState(true)

    return (
        <StrictMode>
            <div className='app'>
                <div className='app-video'>
                    {mount && <Player source={source} />}
                </div>
                <button onClick={() => setMount(s => !s)}>Mount/Umount</button>
            </div>
        </StrictMode>
    )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
