import React, { FC } from 'react'

import { BasePlayerModel } from '../types'

import { PlayerContext } from '../context'
import Mobile from './Mobile'

const isMobile = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0

interface RootProps extends BasePlayerModel {
    setToast: (t: string) => void
}

const Root: FC<RootProps> = props => {
    const { video, vito, options, source, sources } = props
    const { toasts, setToast } = props

    if (video && vito && source && sources)
        return (
            <PlayerContext.Provider
                value={{
                    video,
                    vito,
                    options,
                    source,
                    sources,
                    toasts,
                    setToast,
                }}
            >
                {isMobile() ? <Mobile /> : <Mobile />}
            </PlayerContext.Provider>
        )

    return <></>
}

export default Root
