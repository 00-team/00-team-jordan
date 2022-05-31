import BaseComponent from 'BaseComponent'

import { ConvertTime } from 'utils/time'

type TimeType = 'passed' | 'remaining'

interface TimeProps {
    type?: TimeType
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

    private CleanUpListeners() {
        this.video.removeEventListener('canplay', this.TimeRemainingBind)
        this.video.removeEventListener('timeupdate', this.TimeRemainingBind)
        this.video.removeEventListener('loadstart', this.TimeRemainingBind)

        this.video.removeEventListener('canplay', this.TimePassedBind)
        this.video.removeEventListener('timeupdate', this.TimePassedBind)
        this.video.removeEventListener('loadstart', this.TimePassedBind)
    }

    private SetupListeners(type?: TimeType) {
        this.CleanUpListeners()

        if (type === 'remaining') {
            if (!isNaN(this.video.duration) && !isNaN(this.video.currentTime))
                this.TimeRemainingBind()

            this.video.addEventListener('canplay', this.TimeRemainingBind)
            this.video.addEventListener('timeupdate', this.TimeRemainingBind)
            this.video.addEventListener('loadstart', this.TimeRemainingBind)
        } else {
            if (!isNaN(this.video.duration) && !isNaN(this.video.currentTime))
                this.TimePassedBind()

            this.video.addEventListener('canplay', this.TimePassedBind)
            this.video.addEventListener('timeupdate', this.TimePassedBind)
            this.video.addEventListener('loadstart', this.TimePassedBind)
        }
    }

    override componentDidMount() {
        this.SetupListeners(this.props.type)
    }

    override componentDidUpdate({ type }: TimeProps) {
        if (type !== this.props.type) {
            this.SetupListeners(this.props.type)
        }
    }

    override componentWillUnmount() {
        this.CleanUpListeners()
    }

    override render() {
        return this.state.time
    }
}

export { Time, TimeType }
export default Time
