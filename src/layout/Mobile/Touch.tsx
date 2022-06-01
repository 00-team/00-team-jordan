import React, { ReactElement } from 'react'

import { MouseEvent as RMouseEvent } from 'react'

import BaseComponent from 'BaseComponent'

import { C } from '@00-team/utils'

// style
import './style/touch.scss'

type PanelSide = 'left' | 'right'

interface TouchProps {}

interface TouchState {
    SideTap?: PanelSide
}

const TabTimeout = 500
var TapTwice = false

class Touch extends BaseComponent<TouchProps, TouchState> {
    override state: TouchState = {}

    private DoubleTap(
        e: RMouseEvent<HTMLDivElement, MouseEvent>,
        side: PanelSide
    ) {
        if (!TapTwice) {
            TapTwice = true
            setTimeout(() => (TapTwice = false), TabTimeout)
            return
        }

        this.setState({ SideTap: side })
        e.preventDefault()

        setTimeout(() => {
            this.setState(s =>
                s.SideTap === side ? { SideTap: undefined } : null
            )
        }, TabTimeout)

        if (side === 'left') this.video.currentTime -= 5
        else this.video.currentTime += 5
    }

    override render(): ReactElement {
        return (
            <div className='touch'>
                <div
                    className={
                        'panel left' + C(this.state.SideTap === 'left', 'taped')
                    }
                    onClick={e => this.DoubleTap(e, 'left')}
                >
                    <span>-5</span>
                </div>
                <div
                    className={
                        'panel right' +
                        C(this.state.SideTap === 'right', 'taped')
                    }
                    onClick={e => this.DoubleTap(e, 'right')}
                >
                    <span>+5</span>
                </div>
            </div>
        )
    }
}

export { Touch }
export default Touch
