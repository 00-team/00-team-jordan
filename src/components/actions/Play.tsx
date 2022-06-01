import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'

import Icon from 'icons/play'

interface PlayProps {}

interface PlayState {}

class Play extends BaseComponent<PlayProps, PlayState> {
    override state: PlayState = {}

    private play() {
        if (this.video.paused) this.video.play()
    }

    override render(): ReactElement {
        return (
            <button onClick={() => this.play()}>
                <Icon />
            </button>
        )
    }
}

export { Play }
export default Play
