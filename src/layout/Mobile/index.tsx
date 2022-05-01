import React, { PureComponent, ReactElement } from 'react'

interface MobileProps {}

interface MobileState {}

class Mobile extends PureComponent<MobileProps, MobileState> {
    override state: MobileState = {}

    override render(): ReactElement {
        return <div></div>
    }
}

export { Mobile }
export default Mobile
