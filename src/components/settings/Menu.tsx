import React, { Fragment, PureComponent, ReactElement } from 'react'

import { Menu as MenuType, OptionType, MenuItem } from '../../types'

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

    private RenderOption(opt: MenuItem, index: number): ReactElement {
        switch (opt.type) {
            case OptionType.Element:
                return (
                    <opt.element
                        key={index}
                        parentMenu={this.state.parentMenu}
                    />
                )

            case OptionType.Menu:
                return (
                    <li
                        key={index}
                        onClick={() =>
                            this.setState(s => ({
                                curentMenu: opt.menu,
                                parentMenu: [...s.parentMenu, s.curentMenu],
                                BackButton: true,
                            }))
                        }
                    >
                        {opt.label}
                    </li>
                )
            case OptionType.Action:
                return (
                    <li key={index} onClick={() => opt.action()}>
                        {opt.label}
                    </li>
                )

            default:
                return <Fragment key={index} />
        }
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

                {this.state.curentMenu.map((opt, index) =>
                    this.RenderOption(opt, index)
                )}
            </>
        )
    }
}

export { Menu }
export default Menu
