import React, { PureComponent, ReactElement } from 'react'

// utils
import { ConvertSource, GetMainSource } from './utils'

// types
import { BasePlayerModel } from './types'
import { Source, Options } from './types'

// tree
import RootLayout from './layout/Root'

// style
import './style/player.scss'

interface PlayerProps {
    source: Source
    options?: Options
}

interface PlayerState extends BasePlayerModel {}

class Player extends PureComponent<PlayerProps, PlayerState> {
    override state: PlayerState = {}

    override componentDidMount() {
        let sources = ConvertSource(this.props.source)
        this.setState({ sources: sources, source: GetMainSource(sources) })
    }

    private setToast = this.setToastPR.bind(this)
    private setToastPR(toast: string) {
        this.setState(s => {
            let id = 0

            if (s.toasts && s.toasts.length > 0) id = s.toasts.at(-1)!.id + 1

            setTimeout(() => {
                this.setState(s => ({
                    toasts: s.toasts ? s.toasts.filter(t => t.id !== id) : [],
                }))
            }, 5000)

            return { toasts: [...(s.toasts || []), { id: id, text: toast }] }
        })
    }

    override render(): ReactElement {
        if (!this.state.source) return <></>
        return (
            <div
                className='vito-player'
                ref={node => node && this.setState({ vito: node })}
            >
                <video
                    className='main-video'
                    src={this.state.source.url}
                    ref={node => node && this.setState({ video: node })}
                />

                <RootLayout {...this.state} setToast={this.setToast} />
            </div>
        )
    }
}

export default Player
export { Source, Options, Player }
