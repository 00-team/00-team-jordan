import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'

import Toast from 'common/Toast'
import TogglePPL from 'common/TogglePPL'
import FullScreen from 'components/actions/FullScreen'
import Settings from 'components/settings'
import Duration from 'components/timeline/Duration'
import { Time, TimeType } from 'components/timeline/Time'
import Timeline from 'components/timeline/Timeline'

import './style/controls.scss'
import './style/timeline.scss'
import './style/toasts.scss'

interface ControlsProps {}

interface ControlsState {
    timetype: TimeType
}

class Controls extends BaseComponent<ControlsProps, ControlsState> {
    override state: ControlsState = {
        timetype: 'passed',
    }

    private ToggleTime() {
        this.setState(s =>
            s.timetype === 'passed'
                ? { timetype: 'remaining' }
                : { timetype: 'passed' }
        )
    }

    override render(): ReactElement {
        return (
            <div className='controls'>
                <div className='page page__1'>
                    <div className='wrapper'>
                        <div className='title'></div>
                        <div className='buttons'>
                            <Settings />
                        </div>
                    </div>
                </div>
                <div className='page page__2'>
                    <TogglePPL />
                </div>
                <div className='page page__3'>
                    <div className='section section__1'>
                        <span
                            className='time'
                            onClick={() => this.ToggleTime()}
                        >
                            <Time type={this.state.timetype} /> / <Duration />
                        </span>

                        <Toast />

                        <FullScreen />
                    </div>
                    <div className='section section__2'>
                        <Timeline />
                    </div>
                </div>
            </div>
        )
    }
}

export { Controls }
export default Controls
