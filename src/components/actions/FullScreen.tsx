import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'

import { Contract, Expand } from 'icons/fullscreen'

interface FullScreenProps {}

interface FullScreenState {
    isFullScreen: boolean
}

class FullScreen extends BaseComponent<FullScreenProps, FullScreenState> {
    override state: FullScreenState = {
        isFullScreen: false,
    }

    private ToggleFullScreen() {
        if (!document.fullscreenEnabled)
            throw Error('Full Screen is not Enabled :(')

        if (document.fullscreenElement === this.vito) document.exitFullscreen()
        else this.vito.requestFullscreen()
    }

    private UpdateFullScreen = this.UpdateFullScreenPR.bind(this)
    private UpdateFullScreenPR() {
        this.setState({
            isFullScreen: document.fullscreenElement === this.vito,
        })
    }

    override componentDidMount() {
        this.vito.addEventListener('fullscreenchange', this.UpdateFullScreen)
    }

    override componentWillUnmount() {
        this.vito.removeEventListener('fullscreenchange', this.UpdateFullScreen)
    }

    override render(): ReactElement {
        return (
            <button onClick={() => this.ToggleFullScreen()}>
                {this.state.isFullScreen ? <Contract /> : <Expand />}
            </button>
        )
    }
}

export { FullScreen }
export default FullScreen
