import React, { ReactElement } from 'react'
import BaseComponent from 'BaseComponent'

// icons
import Icon from 'icons/settings'

import { Menu as MenuType, OptionType, SourceObject } from '../../types'
import Menu from './Menu'

interface SettingsProps {}

interface SettingsState {
    showMenu: boolean
    container?: Node
}

const DefaultSpeeds = [
    { label: '0.25', value: 0.25 },
    { label: '0.5', value: 0.5 },
    { label: '0.75', value: 0.75 },
    { label: 'Normal', value: 1.0 },
    { label: '1.25', value: 1.25 },
    { label: '1.5', value: 1.5 },
    { label: '1.75', value: 1.75 },
    { label: '2', value: 2.0 },
]

class Settings extends BaseComponent<SettingsProps, SettingsState> {
    override state: SettingsState = {
        showMenu: false,
    }

    private ChangeQuality(source: SourceObject) {
        const CurrentTime = this.video.currentTime
        const Paused = this.video.paused
        const speed = this.video.playbackRate
        this.video.src = source.url
        this.setToast(`Quality ${source.label}`)
        this.video.load()
        this.video.currentTime = CurrentTime
        this.video.playbackRate = speed
        if (!Paused) this.video.play()
    }

    private MakeMenu(): MenuType {
        const menu: MenuType = [
            {
                label: 'Speeds',
                type: OptionType.Menu,
                menu: DefaultSpeeds.map(speed => ({
                    label: speed.label,
                    type: OptionType.Action,
                    action: () => {
                        this.setToast(`Speed x${speed.value}`)
                        this.video.playbackRate = speed.value
                    },
                })),
            },
            {
                label: 'Qualities',
                type: OptionType.Menu,
                menu: this.sources.map(s => ({
                    label: s.label,
                    type: OptionType.Action,
                    action: () => this.ChangeQuality(s),
                })),
            },
        ]

        return menu
    }

    private ToggleShow() {
        this.setState(s => {
            if (s.showMenu) {
                document.removeEventListener('click', this.CloseMenu)
                return { showMenu: false }
            } else {
                document.addEventListener('click', this.CloseMenu)
                return { showMenu: true }
            }
        })
    }

    private CloseMenu = this.CloseMenuPR.bind(this)
    private CloseMenuPR(e: MouseEvent) {
        if (!this.state.showMenu) return
        if (!this.state.container) return
        if (!(e.target instanceof Node)) return
        if (!e.target.isConnected) return
        if (this.state.container.contains(e.target)) return

        this.setState({ showMenu: false })
        document.removeEventListener('click', this.CloseMenu)
    }

    override componentDidMount() {
        if (this.state.showMenu)
            document.addEventListener('click', this.CloseMenu)
    }

    override componentWillUnmount() {
        document.removeEventListener('click', this.CloseMenu)
    }

    override render(): ReactElement {
        return (
            <div
                className='settings-container'
                ref={node => node && this.setState({ container: node })}
            >
                <button onClick={() => this.ToggleShow()}>
                    <Icon />
                </button>

                {this.state.showMenu && (
                    <ul className='settings-menu'>
                        <Menu menu={this.MakeMenu()} />
                    </ul>
                )}
            </div>
        )
    }
}

export { Settings }
export default Settings
