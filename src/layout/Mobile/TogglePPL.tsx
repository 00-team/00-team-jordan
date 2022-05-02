// toggle play/pause/loading
import React, { ReactElement } from 'react'
import BaseComponent from 'BaseComponent'

// components
import Play from 'components/actions/Play'
import Pause from 'components/actions/Pause'

// icons
import Loading from 'icons/loading'

interface TogglePPLProps {}

interface TogglePPLState {
    isPlaying: boolean
    isLoading: boolean
}

class TogglePPL extends BaseComponent<TogglePPLProps, TogglePPLState> {
    override state: TogglePPLState = {
        isPlaying: false,
        isLoading: true,
    }

    private UpdateIsPlaying = this.UpdateIsPlayingPr.bind(this)
    private UpdateIsPlayingPr() {
        this.setState({ isPlaying: !this.video.paused })
        this.UpdateIsLoadingPr()
    }

    private UpdateIsLoading = this.UpdateIsLoadingPr.bind(this)
    private UpdateIsLoadingPr() {
        if (this.video.readyState === 4) this.setState({ isLoading: false })
        else this.setState({ isLoading: true })
    }

    override componentDidMount() {
        this.video.addEventListener('play', this.UpdateIsPlaying)
        this.video.addEventListener('pause', this.UpdateIsPlaying)

        // loading
        this.video.addEventListener('loadstart', this.UpdateIsLoading)
        this.video.addEventListener('canplay', this.UpdateIsLoading)
        this.video.addEventListener('canplaythrough', this.UpdateIsLoading)
        this.video.addEventListener('progress', this.UpdateIsLoading)
        this.video.addEventListener('loadeddata', this.UpdateIsLoading)
    }

    override componentWillUnmount() {
        this.video.removeEventListener('play', this.UpdateIsPlaying)
        this.video.removeEventListener('pause', this.UpdateIsPlaying)

        // loading
        this.video.removeEventListener('loadstart', this.UpdateIsLoading)
        this.video.removeEventListener('canplay', this.UpdateIsLoading)
        this.video.removeEventListener('canplaythrough', this.UpdateIsLoading)
        this.video.removeEventListener('progress', this.UpdateIsLoading)
        this.video.removeEventListener('loadeddata', this.UpdateIsLoading)
    }

    override render(): ReactElement {
        if (this.state.isLoading) return <Loading />
        if (this.state.isPlaying) return <Pause />
        else return <Play />
    }
}

export { TogglePPL }
export default TogglePPL
