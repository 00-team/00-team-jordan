import React, { PureComponent, ReactElement } from 'react'

import { Menu as MenuType, OptionType } from '../../types'

interface MenuProps {
    menu: MenuType
}

interface MenuState {
    parentMenu: MenuType[]
    curentMenu: MenuType
    BackButton: boolean
}

class Menu extends PureComponent<MenuProps, MenuState> {
    override state: MenuState = {
        parentMenu: [],
        curentMenu: this.props.menu,
        BackButton: false,
    }

    override render(): ReactElement {
        return (
            <ul>
                {this.state.BackButton && (
                    <button
                        onClick={() =>
                            this.setState(s => {
                                let p = s.parentMenu.pop()

                                if (p)
                                    return {
                                        ...s,
                                        curentMenu: p,
                                        BackButton: s.parentMenu.length !== 0,
                                    }

                                return { ...s, BackButton: false }
                            })
                        }
                    >
                        Back Off
                    </button>
                )}
                {this.state.curentMenu.map((opt, index) => (
                    <li
                        key={index}
                        onClick={() =>
                            opt.type === OptionType.Action
                                ? opt.action()
                                : this.setState(s => ({
                                      curentMenu: opt.menu,
                                      parentMenu: [
                                          ...s.parentMenu,
                                          s.curentMenu,
                                      ],
                                      BackButton: true,
                                  }))
                        }
                    >
                        {opt.label}
                    </li>
                ))}
            </ul>
        )
    }
}

export { Menu }
export default Menu
