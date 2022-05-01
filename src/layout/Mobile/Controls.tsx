import React, { PureComponent, ReactElement } from 'react'

interface ControlsProps {}

interface ControlsState {}

class Controls extends PureComponent<ControlsProps, ControlsState> {
    override state: ControlsState = {}

    override render(): ReactElement {
        return <div></div>
    }
}

export { Controls }
export default Controls
