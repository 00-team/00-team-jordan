import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'

import Controls from './Controls'

import './style/index.scss'

interface DesktopState {
    hide: boolean
    clock?: NodeJS.Timeout
}

var LastActivity = 0
const now = () => new Date().getTime()

class Desktop extends BaseComponent<{}, DesktopState> {
    override state: DesktopState = {
        hide: false,
    }

    private UpdateHide(hide: boolean = true) {
        if (this.video.paused && document.fullscreenElement !== this.vito)
            hide = false

        if (hide) this.vito.style.cursor = 'none'
        else this.vito.style.cursor = ''

        this.setState({ hide: hide })
    }

    private UpdateActivity = this.UpdateActivityPR.bind(this)
    private UpdateActivityPR() {
        LastActivity = now()
        this.UpdateHide(false)
    }

    override componentDidMount() {
        document.addEventListener('mousemove', this.UpdateActivity)

        let clock = setInterval(() => {
            if (now() - LastActivity > 3_000) this.UpdateHide()
        }, 500)
        this.setState({ clock: clock })
    }

    override componentWillUnmount() {
        document.removeEventListener('mousemove', this.UpdateActivity)
        if (this.state.clock) clearInterval(this.state.clock)
    }

    override render(): ReactElement {
        return (
            <div className='desktop-layout'>
                {!this.state.hide && <Controls />}
                <div
                    className='toggle'
                    onClick={() => {
                        if (this.video.paused) this.video.play()
                        else this.video.pause()
                    }}
                    onContextMenu={e => e.preventDefault()}
                />
            </div>
        )
    }
}

export { Desktop }
export default Desktop
