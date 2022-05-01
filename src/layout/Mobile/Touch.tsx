import React, { PureComponent, ReactElement } from 'react'

// style
import './style/touch.scss'

interface TouchProps {}

interface TouchState {}

class Touch extends PureComponent<TouchProps, TouchState> {
    override state: TouchState = {}

    override render(): ReactElement {
        return <div className='touch'>touch</div>
    }
}

export { Touch }
export default Touch
