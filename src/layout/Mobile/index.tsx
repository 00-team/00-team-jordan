import React, { PureComponent, ReactElement } from 'react'

// style
import './style/index.scss'

import Controls from './Controls'
import Touch from './Touch'

interface MobileProps {}

interface MobileState {}

class Mobile extends PureComponent<MobileProps, MobileState> {
    override state: MobileState = {}

    override render(): ReactElement {
        return (
            <div className='mobile-layout'>
                <Controls />
                <Touch />
            </div>
        )
    }
}

export { Mobile }
export default Mobile
