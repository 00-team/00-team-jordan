import BaseComponent from 'BaseComponent'
import React, { ReactElement, ReactNode } from 'react'

import { Mute, Off, Low, Medium, High } from 'icons/volume'

type VolumeType = 'mute' | 'off' | 'low' | 'medium' | 'high'

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

interface VolumeState {
    type: VolumeType
}

class Volume extends BaseComponent<{}, VolumeState> {
    override state: VolumeState = {
        type: 'high',
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

    override componentDidMount() {
        this.UpdateTypePR()
        this.video.addEventListener('volumechange', this.UpdateType)
    }

    override componentWillUnmount() {
        this.video.removeEventListener('volumechange', this.UpdateType)
    }

    override render(): ReactElement {
        return (
            <button onClick={() => (this.video.muted = !this.video.muted)}>
                {Icon[this.state.type]}
            </button>
        )
    }
}

export { Volume }
export default Volume
