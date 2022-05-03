import BaseComponent from 'BaseComponent'
import { ConvertTime } from 'utils/time'

interface DurationState {
    duration: string
}

class Duration extends BaseComponent<{}, DurationState> {
    override state: DurationState = {
        duration: '0:00',
    }

    private UpdateDuration = this.UpdateDurationPR.bind(this)
    private UpdateDurationPR() {
        this.setState({
            duration: ConvertTime(Math.floor(this.video.duration)),
        })
    }

    override componentDidMount() {
        this.video.addEventListener('loadedmetadata', this.UpdateDuration)
        this.video.addEventListener('loadeddata', this.UpdateDuration)
        this.video.addEventListener('canplay', this.UpdateDuration)
    }

    override componentWillUnmount() {
        this.video.removeEventListener('loadedmetadata', this.UpdateDuration)
        this.video.removeEventListener('loadeddata', this.UpdateDuration)
        this.video.removeEventListener('canplay', this.UpdateDuration)
    }

    override render() {
        return this.state.duration
    }
}

export { Duration }
export default Duration
