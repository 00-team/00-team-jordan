import React, { PureComponent, ReactElement } from 'react'

// style
import './style/controls.scss'

// components
import TogglePPL from './TogglePPL'

interface ControlsProps {}

interface ControlsState {}

class Controls extends PureComponent<ControlsProps, ControlsState> {
    override state: ControlsState = {}

    override render(): ReactElement {
        return (
            <div className='controls'>
                <div className='page page-1'></div>
                <div className='page page-2'>
                    <TogglePPL />
                </div>
                <div className='page page-3'></div>
            </div>
        )
    }
}

export { Controls }
export default Controls
