import BaseComponent from '../BaseComponent'

import { ConvertTime } from 'utils/time'

interface TimeProps {
    type?: 'passed' | 'remaining'
}

interface TimeState {
    time: string
}

class Time extends BaseComponent<TimeProps, TimeState> {
    override state: TimeState = {
        time: '0:00',
    }

    private TimePassedBind = this.TimePassed.bind(this)
    private TimePassed() {
        this.setState({ time: ConvertTime(Math.floor(this.video.currentTime)) })
    }

    private TimeRemainingBind = this.TimeRemaining.bind(this)
    private TimeRemaining() {
        this.setState({
            time: ConvertTime(
                Math.floor(this.video.duration) -
                    Math.floor(this.video.currentTime)
            ),
        })
    }

    override componentDidMount() {
        if (this.props.type === 'remaining') {
            this.video.addEventListener('canplay', this.TimeRemainingBind)
            this.video.addEventListener('timeupdate', this.TimeRemainingBind)
            this.video.addEventListener('loadstart', this.TimeRemainingBind)
        } else {
            this.video.addEventListener('canplay', this.TimePassedBind)
            this.video.addEventListener('timeupdate', this.TimePassedBind)
            this.video.addEventListener('loadstart', this.TimePassedBind)
        }
    }

    override componentWillUnmount() {
        this.video.removeEventListener('canplay', this.TimeRemainingBind)
        this.video.removeEventListener('timeupdate', this.TimeRemainingBind)
        this.video.removeEventListener('loadstart', this.TimeRemainingBind)

        this.video.removeEventListener('canplay', this.TimePassedBind)
        this.video.removeEventListener('timeupdate', this.TimePassedBind)
        this.video.removeEventListener('loadstart', this.TimePassedBind)
    }

    override render() {
        return this.state.time
    }
}

export { Time }
export default Time
