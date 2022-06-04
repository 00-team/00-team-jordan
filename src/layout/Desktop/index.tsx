import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'

import Controls from './Controls'

import './style/index.scss'

interface DesktopProps {}

interface DesktopState {}

class Desktop extends BaseComponent<DesktopProps, DesktopState> {
    override state: DesktopState = {}

    override render(): ReactElement {
        return (
            <div className='desktop-layout'>
                <Controls />
            </div>
        )
    }
}

export { Desktop }
export default Desktop
