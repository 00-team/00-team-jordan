import React, { FC } from 'react'

// types
import { SourceObject, SourceObjectList, Options } from './types'

// components
import Time from 'components/timeline/Time'
import Play from 'components/actions/Play'

// context
import { PlayerContext } from './context'

interface PlayerTreeProps {
    video?: HTMLVideoElement
    vito?: HTMLDivElement
    options?: Options
    sources?: SourceObjectList
    source?: SourceObject // Current Source
    changeSource: (s: SourceObject) => void
}

const PlayerTree: FC<PlayerTreeProps> = props => {
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
                <Time type='passed' /> / <Time type='remaining' />
                <Play />
            </PlayerContext.Provider>
        )

    return <></>
}

export default PlayerTree
