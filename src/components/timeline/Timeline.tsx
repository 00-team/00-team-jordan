import React, { ReactElement } from 'react'
import BaseComponent from 'BaseComponent'

const F = (n: number) => Math.floor(n)

type TP = (container: number, number: number) => number
const P: TP = (c, n) => (100 / c) * n
const PP: TP = (...args) => {
    let p = P(...args)
    if (p > 100) return 100
    if (p < 0) return 0

    return p
}
PP
F

interface TimelineProps {}

interface TimelineState {
    percentage: number
    onHold: boolean
}

class Timeline extends BaseComponent<TimelineProps, TimelineState> {
    override state: TimelineState = {
        percentage: 0,
        onHold: false,
    }

    private UpdateTime = this.UpdateTimePR.bind(this)
    private UpdateTimePR() {
        this.setState({
            percentage: P(this.video.duration, this.video.currentTime),
        })
    }

    override componentDidMount() {
        // time
        this.video.addEventListener('timeupdate', this.UpdateTime)
    }

    override componentWillUnmount() {
        // time
        this.video.removeEventListener('timeupdate', this.UpdateTime)
    }

    override render(): ReactElement {
        return (
            <div
                className='timeline-container'

                // onMouseDown={this.HandleMouseDownBind}
                //     onTouchStart={this.HandleTouchStartBind}
                //     ref={this.TimeLineRef.bind(this)}
            >
                <div className='timeline'>
                    <div
                        className='fill'
                        style={{
                            width: `${this.state.percentage}%`,
                        }}
                    />
                </div>

                <div className='timeline-shadow'>
                    <div
                        className='thumb'
                        style={{ left: `${this.state.percentage}%` }}
                    />
                </div>
            </div>
        )
    }
}

export { Timeline }
export default Timeline
