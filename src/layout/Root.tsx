import React, { FC } from 'react'

// types
import { SourceObject, SourceObjectList, Options } from '../types'

// layouts
import Mobile from './Mobile'

// context
import { PlayerContext } from '../context'

interface RootProps {
    video?: HTMLVideoElement
    vito?: HTMLDivElement
    options?: Options
    sources?: SourceObjectList
    source?: SourceObject // Current Source
    changeSource: (s: SourceObject) => void
}

const Root: FC<RootProps> = props => {
    const { video, vito, options, source, sources } = props
    const { changeSource } = props

    if (video && vito && source && sources)
        return (
            <PlayerContext.Provider
                value={{
                    video,
                    vito,
                    options,
                    source,
                    sources,
                    changeSource,
                }}
            >
                <Mobile />
            </PlayerContext.Provider>
        )

    return <></>
}

export default Root
