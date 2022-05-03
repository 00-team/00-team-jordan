import React, { ReactElement } from 'react'
import BaseComponent from 'BaseComponent'

// style
import './style/controls.scss'

// components
import TogglePPL from './TogglePPL'
import Time from 'components/timeline/Time'
import Duration from 'components/timeline/Duration'
import FullScreen from 'components/actions/FullScreen'

interface ControlsProps {}

interface ControlsState {}

class Controls extends BaseComponent<ControlsProps, ControlsState> {
    override state: ControlsState = {}

    override render(): ReactElement {
        return (
            <div className='controls'>
                <div className='page page__1'></div>
                <div className='page page__2'>
                    <TogglePPL />
                </div>
                <div className='page page__3'>
                    <div className='section section__1'>
                        <span className='time'>
                            <Time /> / <Duration />
                        </span>

                        <FullScreen />
                    </div>
                    <div className='section section__2'></div>
                </div>
            </div>
        )
    }
}

export { Controls }
export default Controls
