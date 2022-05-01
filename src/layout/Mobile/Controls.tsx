import React, { PureComponent, ReactElement } from 'react'

// style
import './style/controls.scss'

interface ControlsProps {}

interface ControlsState {}

class Controls extends PureComponent<ControlsProps, ControlsState> {
    override state: ControlsState = {}

    override render(): ReactElement {
        return <div className='controls'>controls</div>
    }
}

export { Controls }
export default Controls
