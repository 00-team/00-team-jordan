import React, { ReactElement } from 'react'
import { MouseEvent as RMouseEvent, TouchEvent as RTouchEvent } from 'react'
import BaseComponent from 'BaseComponent'

type TP = (container: number, number: number) => number
const P: TP = (c, n) => (100 / c) * n

// type timeline element
type TTLEL = HTMLDivElement

interface TimelineProps {}

interface TimelineState {
    percentage: number
    onHold: boolean
    node?: TTLEL
}

class Timeline extends BaseComponent<TimelineProps, TimelineState> {
    override state: TimelineState = {
        percentage: 0,
        onHold: false,
    }

    private UpdatePercentage(clientX: number) {
        if (!this.state.node) return

        const { left, width } = this.state.node.getBoundingClientRect()
        let percentage = ((clientX - left) / width) * 100
        if (percentage > 100) percentage = 100
        if (percentage < 0) percentage = 0

        let time = (this.video.duration / 100) * percentage

        this.setState({ percentage: percentage })
        if (!isNaN(time)) this.video.currentTime = time

        // this.video.dispatchEvent(new Event('timeupdate'))
    }

    private UpdateTime = this.UpdateTimePR.bind(this)
    private UpdateTimePR() {
        this.setState({
            percentage: P(this.video.duration, this.video.currentTime),
        })
    }

    private MouseDown = this.MouseDownPR.bind(this)
    private MouseDownPR(e: RMouseEvent<TTLEL, MouseEvent>) {
        this.UpdatePercentage(e.clientX)
        this.setState({ onHold: true })

        document.addEventListener('mousemove', this.MouseMove)
        document.addEventListener('mouseup', this.MouseUp)
    }

    private MouseMove = this.MouseMovePR.bind(this)
    private MouseMovePR(e: MouseEvent) {
        e.preventDefault()
        this.UpdatePercentage(e.clientX)
    }

    private MouseUp = this.MouseUpPR.bind(this)
    private MouseUpPR() {
        document.removeEventListener('mousemove', this.MouseMove)
        document.removeEventListener('mouseup', this.MouseUp)
        this.setState({ onHold: false })
    }

    private TouchStart = this.TouchStartPR.bind(this)
    private TouchStartPR(e: RTouchEvent<TTLEL>) {
        if (e.touches.length <= 0 || !e.touches[0]) return

        this.setState({ onHold: true })
        this.UpdatePercentage(e.touches[0].clientX)

        document.addEventListener('touchmove', this.TouchMove)
        document.addEventListener('touchend', this.TouchEnd)
    }

    private TouchMove = this.TouchMovePR.bind(this)
    private TouchMovePR(e: TouchEvent) {
        if (e.touches.length <= 0 || !e.touches[0]) return
        this.UpdatePercentage(e.touches[0].clientX)
    }

    private TouchEnd = this.TouchEndPR.bind(this)
    private TouchEndPR() {
        document.removeEventListener('touchmove', this.TouchMove)
        document.removeEventListener('touchend', this.TouchEnd)
        this.setState({ onHold: false })
    }

    override componentDidMount() {
        if (!isNaN(this.video.duration) && !isNaN(this.video.currentTime))
            this.UpdateTime()
        // time
        this.video.addEventListener('timeupdate', this.UpdateTime)
    }

    override componentWillUnmount() {
        this.video.removeEventListener('timeupdate', this.UpdateTime)
        document.removeEventListener('mousemove', this.MouseMove)
        document.removeEventListener('mouseup', this.MouseUp)
    }

    override render(): ReactElement {
        return (
            <div
                className='timeline-container'
                onMouseDown={this.MouseDown}
                onTouchStart={this.TouchStart}
                ref={node => node && this.setState({ node: node })}
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
