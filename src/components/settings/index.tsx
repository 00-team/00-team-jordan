import React, { ReactElement } from 'react'
import BaseComponent from 'BaseComponent'

// icons
import Icon from 'icons/settings'

interface SettingsProps {}

interface SettingsState {}

class Settings extends BaseComponent<SettingsProps, SettingsState> {
    override state: SettingsState = {}

    override render(): ReactElement {
        return (
            <button onClick={() => alert('settings')}>
                <Icon />
            </button>
        )
    }
}

export { Settings }
export default Settings
