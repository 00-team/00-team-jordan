import React, { PureComponent, ReactElement } from 'react'

interface TouchProps {}

interface TouchState {}

class Touch extends PureComponent<TouchProps, TouchState> {
    override state: TouchState = {}

    override render(): ReactElement {
        return <div></div>
    }
}

export { Touch }
export default Touch
