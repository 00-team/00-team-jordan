import React, { ReactElement } from 'react'
import BaseComponent from 'BaseComponent'

// icons
import Icon from 'icons/settings'

import { Menu as MenuType, OptionType } from '../../types'
import Menu from './Menu'

interface SettingsProps {}

interface SettingsState {}

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
    override state: SettingsState = {}

    private ChangeQuality(url: string) {
        const CurrentTime = this.video.currentTime
        const Paused = this.video.paused
        const speed = this.video.playbackRate
        this.video.src = url
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
                    action: () => (this.video.playbackRate = speed.value),
                })),
            },
            {
                label: 'Qualities',
                type: OptionType.Menu,
                menu: this.sources.map(s => ({
                    label: s.label,
                    type: OptionType.Action,
                    action: () => this.ChangeQuality(s.url),
                })),
            },
        ]

        return menu
        // this.sources
        // this.changeSource
    }

    override render(): ReactElement {
        return (
            <div className='settings-container'>
                <button onClick={() => alert('settings')}>
                    <Icon />
                </button>

                <div className='settings-menu'>
                    <Menu menu={this.MakeMenu()} />
                </div>
            </div>
        )
    }
}

export { Settings }
export default Settings
