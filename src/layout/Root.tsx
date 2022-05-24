import React, { FC } from 'react'

// types
import { SourceObject, SourceObjectList, Options } from '../types'

// layouts
import Mobile from './Mobile'

// context
import { PlayerContext } from '../context'

const isMobile = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0

interface RootProps {
    video?: HTMLVideoElement
    vito?: HTMLDivElement
    options?: Options
    sources?: SourceObjectList
    source?: SourceObject // Current Source
}

const Root: FC<RootProps> = props => {
    const { video, vito, options, source, sources } = props

    if (video && vito && source && sources)
        return (
            <PlayerContext.Provider
                value={{
                    video,
                    vito,
                    options,
                    source,
                    sources,
                }}
            >
                {isMobile() ? <Mobile /> : <Mobile />}
            </PlayerContext.Provider>
        )

    return <></>
}

export default Root
