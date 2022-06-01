import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'

import Icon from 'icons/pause'

interface PauseProps {}

interface PauseState {}

class Pause extends BaseComponent<PauseProps, PauseState> {
    override state: PauseState = {}

    private pause() {
        if (!this.video.paused) this.video.pause()
    }

    override render(): ReactElement {
        return (
            <button onClick={() => this.pause()}>
                <Icon />
            </button>
        )
    }
}

export { Pause }
export default Pause
