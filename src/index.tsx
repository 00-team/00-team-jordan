import React, { FC, PureComponent, ReactElement } from 'react'

// utils
import { ConvertSource, GetMainSource } from './utils'

// types
import { Source, Options, SourceObject, SourceObjectList } from './types'

// context
import { PlayerContext } from './context'

interface PlayerProps {
    source: Source
    options?: Options
}

interface PlayerState {
    video?: HTMLVideoElement
    vito?: HTMLDivElement
    options?: Options
    sources?: SourceObjectList
    source?: SourceObject // Current Source
}

class Player extends PureComponent<PlayerProps, PlayerState> {
    override state: PlayerState = {}

    override componentDidMount() {
        let sources = ConvertSource(this.props.source)
        this.setState({ sources: sources, source: GetMainSource(sources) })
    }

    private changeSource(s: SourceObject) {
        this.setState({ source: s })
    }

    override render(): ReactElement {
        if (!this.state.source) return <></>
        return (
            <div
                className='vito-player'
                ref={node => node && this.setState({ vito: node })}
            >
                <video
                    src={this.state.source.url}
                    controls
                    ref={node => node && this.setState({ video: node })}
                />
                <PlayerTree changeSource={this.changeSource} {...this.state} />
            </div>
        )
    }
}

interface PlayerTreeProps extends PlayerState {
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
                <div>test</div>
            </PlayerContext.Provider>
        )

    return <></>
}

export default Player
export { Source, Options, Player }
