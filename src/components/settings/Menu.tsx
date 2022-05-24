import React, { PureComponent, ReactElement } from 'react'

import { Menu as MenuType, OptionType } from '../../types'

interface MenuProps {
    menu: MenuType
    className?: string
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
            <>
                {this.state.BackButton && (
                    <button
                        className='menu-back-button'
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
                        &#60; Back
                    </button>
                )}
                {this.state.curentMenu.map((opt, index) => (
                    <li
                        className={
                            'menu-item' +
                            (opt.type === OptionType.Menu ? ' menu' : ' action')
                        }
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
            </>
        )
    }
}

export { Menu }
export default Menu
