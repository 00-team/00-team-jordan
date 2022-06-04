import BaseComponent from 'BaseComponent'
import React, { ReactElement } from 'react'

import Loading from 'icons/loading'

import Pause from 'components/actions/Pause'
import Play from 'components/actions/Play'

interface TogglePPLProps {
    Loading?: boolean
}

interface TogglePPLState {
    isPlaying: boolean
    isLoading: boolean
}

class TogglePPL extends BaseComponent<TogglePPLProps, TogglePPLState> {
    override state: TogglePPLState = {
        isPlaying: false,
        isLoading: true,
    }

    private showLoading = this.props.Loading === undefined || this.props.Loading

    private UpdateIsPlaying = this.UpdateIsPlayingPR.bind(this)
    private UpdateIsPlayingPR() {
        this.setState({ isPlaying: !this.video.paused })
        this.UpdateIsLoadingPR()
    }

    private UpdateIsLoading = this.UpdateIsLoadingPR.bind(this)
    private UpdateIsLoadingPR() {
        if (this.video.readyState === 4) this.setState({ isLoading: false })
        else this.setState({ isLoading: true })
    }

    override componentDidMount() {
        this.UpdateIsPlayingPR()

        this.video.addEventListener('play', this.UpdateIsPlaying)
        this.video.addEventListener('pause', this.UpdateIsPlaying)

        // loading
        if (this.showLoading) {
            this.UpdateIsLoadingPR()
            this.video.addEventListener('loadstart', this.UpdateIsLoading)
            this.video.addEventListener('canplay', this.UpdateIsLoading)
            this.video.addEventListener('canplaythrough', this.UpdateIsLoading)
            this.video.addEventListener('progress', this.UpdateIsLoading)
            this.video.addEventListener('loadeddata', this.UpdateIsLoading)
        }
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
        if (this.state.isLoading && this.showLoading) return <Loading />
        if (this.state.isPlaying) return <Pause />
        else return <Play />
    }
}

export { TogglePPL }
export default TogglePPL
