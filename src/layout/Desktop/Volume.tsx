import BaseComponent from 'BaseComponent'
import React, { ReactElement, ReactNode } from 'react'
import { MouseEvent as RMouseEvent } from 'react'

import { C } from '@00-team/utils'

import { Mute, Off, Low, Medium, High } from 'icons/volume'

import './style/volume.scss'

type VolumeType = 'mute' | 'off' | 'low' | 'medium' | 'high'
type DailElement = HTMLDivElement

interface VolumeProps {}

interface VolumeState {
    type: VolumeType
    show: boolean
    onHold: boolean
    volume: number
    node?: DailElement
}

class Volume extends BaseComponent<VolumeProps, VolumeState> {
    override state: VolumeState = {
        type: 'high',
        show: false,
        onHold: false,
        volume: this.video.volume,
    }

    private ToggleMute() {
        this.video.muted = !this.video.muted
    }

    private UpdateType = this.UpdateTypePR.bind(this)
    private UpdateTypePR() {
        this.setState(() => {
            if (this.video.muted) return { type: 'mute' }
            if (this.video.volume === 0) return { type: 'off' }
            if (this.video.volume < 0.4) return { type: 'low' }
            if (this.video.volume < 0.6) return { type: 'medium' }
            return { type: 'high' }
        })
    }

    // Dial
    private UpdateVolume(clientX: number) {
        if (!this.state.node) return

        const { left, width } = this.state.node.getBoundingClientRect()
        let volume = (clientX - left) / width
        if (volume > 1) volume = 1
        if (volume < 0) volume = 0

        this.video.volume = volume
        this.setState({ volume: volume })
        this.UpdateTypePR()
    }

    private MouseDown(e: RMouseEvent<DailElement, MouseEvent>) {
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

    override componentDidMount() {
        this.UpdateTypePR()
        this.video.addEventListener('volumechange', this.UpdateType)
    }

    override componentWillUnmount() {
        this.video.removeEventListener('volumechange', this.UpdateType)
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
                <button onClick={() => this.ToggleMute()}>
                    {Icon[this.state.type]}
                </button>

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

type TIcon = {
    [key in VolumeType]: ReactNode
}

const Icon: TIcon = {
    mute: <Mute />,
    off: <Off />,
    low: <Low />,
    medium: <Medium />,
    high: <High />,
}

export { Volume }
export default Volume
