import { createContext } from 'react'

import { SourceObject, SourceObjectList } from '../types'
import { BasePlayerModel } from '../types'

interface PlayerContextType extends BasePlayerModel {
    video: HTMLVideoElement
    vito: HTMLDivElement
    sources: SourceObjectList
    source: SourceObject // Current Source
    setToast: (t: string) => void
}

const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType)

export { PlayerContextType, PlayerContext }
