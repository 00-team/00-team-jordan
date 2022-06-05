import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'

import { C } from '@00-team/utils'

import Icon from 'common/Volume'

import './style/volume.scss'

type MouseDownEvent = React.MouseEvent<HTMLDivElement, MouseEvent>

interface VolumeState {
    show: boolean
    onHold: boolean
    volume: number
    node?: HTMLDivElement
}

class Volume extends BaseComponent<{}, VolumeState> {
    override state: VolumeState = {
        show: false,
        onHold: false,
        volume: this.video.volume,
    }

    private UpdateVolume(clientX: number) {
        if (!this.state.node) return

        const { left, width } = this.state.node.getBoundingClientRect()
        let volume = (clientX - left) / width
        if (volume > 1) volume = 1
        if (volume < 0) volume = 0

        this.video.volume = volume
        this.setState({ volume: volume })
    }

    private MouseDown(e: MouseDownEvent) {
        this.UpdateVolume(e.clientX)
        this.setState({ onHold: true })

        document.addEventListener('mousemove', this.MouseMove)
        document.addEventListener('mouseup', this.MouseUp)
    }

    private MouseMove = this.MouseMovePR.bind(this)
    private MouseMovePR(e: MouseEvent) {
        e.preventDefault()
        this.UpdateVolume(e.clientX)
    }

    private MouseUp = this.MouseUpPR.bind(this)
    private MouseUpPR(e: MouseEvent) {
        this.UpdateVolume(e.clientX)
        document.removeEventListener('mousemove', this.MouseMove)
        document.removeEventListener('mouseup', this.MouseUp)
        this.setState({ onHold: false })
    }

    override render(): ReactElement {
        return (
            <div
                className={
                    'volume' + C(this.state.show || this.state.onHold, 'show')
                }
                onMouseEnter={() => this.setState({ show: true })}
                onMouseLeave={() => this.setState({ show: false })}
            >
                <Icon />

                <div className='dial-container'>
                    <div
                        className='dail-wrapper'
                        onMouseDown={e => this.MouseDown(e)}
                        ref={node => node && this.setState({ node: node })}
                    >
                        <div className='dial'>
                            <div
                                className='fill'
                                style={{ width: `${this.state.volume * 100}%` }}
                            />
                        </div>

                        <div className='dial-shadow'>
                            <div
                                className='thumb'
                                style={{ left: `${this.state.volume * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { Volume }
export default Volume
