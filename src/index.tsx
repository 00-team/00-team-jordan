import React, { PureComponent, ReactElement } from 'react'

// utils
import { ConvertSource, GetMainSource } from './utils'

import { Source, Options, SourceObject } from './types'

interface PlayerProps {
    source: Source
    options?: Options
}

interface PlayerState {
    sources: SourceObject[]
    source: SourceObject // Current Source
}

export class Player extends PureComponent<PlayerProps, PlayerState> {
    override state: PlayerState = {
        sources: [],
        source: { url: '', label: '' },
    }

    override componentDidMount() {
        let sources = ConvertSource(this.props.source)
        this.setState({ sources: sources, source: GetMainSource(sources) })
    }

    override render(): ReactElement {
        return (
            <div>
                <video src={this.state.source.url} controls></video>
            </div>
        )
    }
}

export default Player
export { Source, Options }
