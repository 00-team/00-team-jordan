import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'

import Controls from './Controls'
import Touch from './Touch'

import './style/index.scss'

interface MobileProps {}

interface MobileState {
    hide: boolean
}

var HideTimer: NodeJS.Timeout = 0 as any

class Mobile extends BaseComponent<MobileProps, MobileState> {
    override state: MobileState = {
        hide: false,
    }

    private HideCheck = this.HideCheckPR.bind(this)
    private HideCheckPR() {
        this.UpdateHide(false)
        clearTimeout(HideTimer)

        HideTimer = setTimeout(() => {
            this.UpdateHide()
        }, 3000)
    }

    private UpdateHide(hide: boolean = true) {
        if (this.video.paused && document.fullscreenElement !== this.vito)
            hide = false

        this.setState({ hide: hide })
    }

    override componentDidMount() {
        this.video.addEventListener('play', this.HideCheck)
        this.video.addEventListener('pause', this.HideCheck)

        this.vito.addEventListener('touchstart', this.HideCheck)
    }

    override componentWillUnmount() {
        this.video.removeEventListener('play', this.HideCheck)
        this.video.removeEventListener('pause', this.HideCheck)

        this.vito.removeEventListener('touchstart', this.HideCheck)
    }

    override render(): ReactElement {
        return (
            <div className='mobile-layout'>
                {!this.state.hide && <Controls />}
                <Touch />
            </div>
        )
    }
}

export { Mobile }
export default Mobile
