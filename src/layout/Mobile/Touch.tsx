import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'
import { MouseEvent as RMouseEvent } from 'react'

import { C } from '@00-team/utils'

import './style/touch.scss'

type PanelSide = 'left' | 'right'

interface TouchProps {}

interface TouchState {
    SideTap?: PanelSide
    LeftTaped: number
    RightTaped: number
    seek: number
}

const TabTimeout = 400
var LastTaped = 0

const now = () => new Date().getTime()

class Touch extends BaseComponent<TouchProps, TouchState> {
    override state: TouchState = {
        LeftTaped: 0,
        RightTaped: 0,
        seek: 0,
    }

    private DoubleTap(
        e: RMouseEvent<HTMLDivElement, MouseEvent>,
        side: PanelSide
    ) {
        e.preventDefault()
        LastTaped = now()
        this.setState(s => {
            let LeftTaped = s.LeftTaped
            let RightTaped = s.RightTaped

            if (side === 'left') LeftTaped++
            else RightTaped++

            let seek = RightTaped - LeftTaped

            if (seek > 1) seek = (seek - 1) * 5
            else if (seek < -1) seek = (seek + 1) * 5
            else seek = 0

            return {
                seek: seek,
                SideTap: seek !== 0 ? side : undefined,
                LeftTaped: LeftTaped,
                RightTaped: RightTaped,
            }
        })

        setTimeout(() => {
            if (now() - LastTaped < TabTimeout) return

            this.setState(s => {
                this.video.currentTime += s.seek

                return {
                    LeftTaped: 0,
                    RightTaped: 0,
                    SideTap: undefined,
                    seek: 0,
                }
            })
            LastTaped = 0
        }, TabTimeout)
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
                    <span>{this.state.seek}</span>
                </div>
                <div
                    className={
                        'panel right' +
                        C(this.state.SideTap === 'right', 'taped')
                    }
                    onClick={e => this.DoubleTap(e, 'right')}
                >
                    <span>{this.state.seek}</span>
                </div>
            </div>
        )
    }
}

export { Touch }
export default Touch
