import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'

import Icon from 'icons/floatscreen'

class FloatScreen extends BaseComponent {
    private Toggle() {
        if (!document.pictureInPictureEnabled)
            throw Error('Picture In Picture is not Enabled :(')

        if (document.pictureInPictureElement === this.video)
            document.exitPictureInPicture()
        else this.video.requestPictureInPicture()
    }

    override render(): ReactElement {
        return (
            <button onClick={() => this.Toggle()}>
                <Icon />
            </button>
        )
    }
}

export { FloatScreen }
export default FloatScreen
