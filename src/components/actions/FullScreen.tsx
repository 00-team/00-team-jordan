import React, { ReactElement } from 'react'
import BaseComponent from 'BaseComponent'

// icons
import { Contract, Expand } from 'icons/fullscreen'
Contract
Expand

interface FullScreenProps {}

interface FullScreenState {}

class FullScreen extends BaseComponent<FullScreenProps, FullScreenState> {
    override state: FullScreenState = {}

    override render(): ReactElement {
        return (
            <button>
                {/* <Contract /> */}
                <Expand />
            </button>
        )
    }
}

export { FullScreen }
export default FullScreen
