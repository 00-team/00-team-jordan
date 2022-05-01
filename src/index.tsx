import React, { PureComponent, ReactElement } from 'react'

// utils
import { ConvertSource, GetMainSource } from './utils'

// types
import { Source, Options, SourceObject, SourceObjectList } from './types'

// tree
import RootLayout from './layout/Root'

// style
import './style/player.scss'

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
                    ref={node => node && this.setState({ video: node })}
                />
                <RootLayout changeSource={this.changeSource} {...this.state} />
            </div>
        )
    }
}

export default Player
export { Source, Options, Player }
