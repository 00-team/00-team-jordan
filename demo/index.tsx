import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'

// style
import './style.scss'

// player
import { Player, Source } from '../lib/'

import duck_144p from './videos/144p.mp4'
import duck_240p from './videos/240p.mp4'
import duck_360p from './videos/360p.mp4'
import duck_480p from './videos/480p.mp4'
import duck_720p from './videos/original.mp4'

const source: Source = [
    // 'https://cdn.discordapp.com/attachments/837976157609656323/842785794485780520/Shrek_1.mp4',
    // 'https://cdn.discordapp.com/attachments/876184324133752874/944696426544373790/nima_1384_bzan_20220219_222030_0.mp4',
    {
        label: '144p',
        url: duck_144p,
    },
    {
        label: '240p',
        url: duck_240p,
    },
    {
        label: '360p',
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
    return (
        <div className='app'>
            <div className='app-video'>
                <Player source={source} />
            </div>
        </div>
    )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
