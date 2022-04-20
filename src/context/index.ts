import { createContext } from 'react'

import { Options, Source } from '../types'

interface PlayerContextType {
    video: HTMLVideoElement
    master: HTMLDivElement
    options?: Options
    source: Source
}

const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType)

export { PlayerContextType, PlayerContext }
