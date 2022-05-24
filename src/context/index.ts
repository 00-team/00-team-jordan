import { createContext } from 'react'

import { Options, SourceObject, SourceObjectList } from '../types'

interface PlayerContextType {
    video: HTMLVideoElement
    vito: HTMLDivElement
    options?: Options
    sources: SourceObjectList
    source: SourceObject // Current Source
}

const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType)

export { PlayerContextType, PlayerContext }
