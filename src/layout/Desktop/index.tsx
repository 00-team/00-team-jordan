import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'

interface DesktopProps {}

interface DesktopState {}

class Desktop extends BaseComponent<DesktopProps, DesktopState> {
    override state: DesktopState = {}

    override render(): ReactElement {
        return <div></div>
    }
}

export { Desktop }
export default Desktop
